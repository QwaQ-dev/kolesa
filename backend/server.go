package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/rs/cors"
)

type Element struct {
	Id      int    `json:"id"`
	Name    string `json:"name"`
	TypeCar string `json:"typecar"`
	Descr   string `json:"descr"`
	Image   string `json:"image"`
	Price   int    `json:"price"`
}

type ElementPlane struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Descr     string `json:"descr"`
	TypePlane string `json:"typeplane"`
	Image     string `json:"image"`
	Price     int    `json:"price"`
}В

func main() {
	r := mux.NewRouter()

	// Установка маршрутов
	r.HandleFunc("/", addElementHandler).Methods("POST")
	r.HandleFunc("/elements", getElementsHandler).Methods("GET")
	r.HandleFunc("/count-elements", countElementsHandler).Methods("GET") // Новый маршрут для подсчета элементов
	r.HandleFunc("/car/{id}", getCarHandler).Methods("GET")
	r.HandleFunc("/car/typecar/{typecar}", getCarByTypeCar).Methods("GET")                   //маршрут для получения информации о машине по ID
	r.HandleFunc("/count-elements/{typecar}", countElementsByCategoryHandler).Methods("GET") // получаем количество элементов по категории
	r.HandleFunc("/planes", getPlanesHandler).Methods("GET")                                 // маршрут для получения самолетов
	r.HandleFunc("/count-plane", countPlanesHandler).Methods("GET")                          //маршрут для получения количества самолетов
	r.HandleFunc("/add-plane", addPlaneHandler).Methods("POST")
	r.HandleFunc("/plane/{id}", getPlaneHandler).Methods("GET")
	r.HandleFunc("/count-plane/{typeplane}", countPlanesByCategoryHandler).Methods("GET")
	r.HandleFunc("/plane/typeplane/{typeplane}", getPlaneByTypePlane).Methods("GET")

	// Настройка CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Измените источник по необходимости
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		Debug:            true, // Установите false в продакшн
	})

	// Применение промежуточного ПО CORS
	handler := c.Handler(r)

	log.Fatal(http.ListenAndServe(":8080", handler))
}

func addElementHandler(w http.ResponseWriter, r *http.Request) {
	var element Element
	err := json.NewDecoder(r.Body).Decode(&element)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// CHANGE
	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/koleso")
	//
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	_, err = db.Exec("INSERT INTO kolesokzfin (name, typecar, descr, image, price) VALUES ($1, $2, $3, $4, $5)", element.Name, element.TypeCar, element.Descr, element.Image, element.Price)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to insert data into database: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Data inserted successfully")
}

func addPlaneHandler(w http.ResponseWriter, r *http.Request) {
	var element ElementPlane
	err := json.NewDecoder(r.Body).Decode(&element)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// CHANGE
	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/kolesakzplanes")
	//
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()
	// CHANGE
	_, err = db.Exec("INSERT INTO planeskz (name, descr, typeplane, image, price) VALUES ($1, $2, $3, $4, $5)", element.Name, element.Descr, element.TypePlane, element.Image, element.Price)
	//
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to insert data into database: %v", err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Data inserted successfully")
}

func getPlanesHandler(w http.ResponseWriter, r *http.Request) {
	// CHANGE
	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/kolesakzplanes")
	//
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()
	// CHANGE
	rows, err := db.Query("SELECT id, name, descr, typeplane, image, price FROM planeskz")
	//
	if err != nil {
		http.Error(w, "Failes to query DB", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var elements []ElementPlane
	for rows.Next() {
		var element ElementPlane
		if err := rows.Scan(&element.Id, &element.Name, &element.Descr, &element.TypePlane, &element.Image, &element.Price); err != nil {
			http.Error(w, "Failed to scan row", http.StatusInternalServerError)
			return
		}
		elements = append(elements, element)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(elements)
}
func getElementsHandler(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/koleso")
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	rows, err := db.Query("SELECT id, name, typecar, descr, image, price FROM kolesokzfin")
	if err != nil {
		http.Error(w, "Failed to query database", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var elements []Element
	for rows.Next() {
		var element Element
		if err := rows.Scan(&element.Id, &element.Name, &element.TypeCar, &element.Descr, &element.Image, &element.Price); err != nil {
			http.Error(w, "Failed to scan row", http.StatusInternalServerError)
			return
		}
		elements = append(elements, element)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(elements)
}

func countElementsHandler(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/koleso")
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM kolesokzfin").Scan(&count)
	if err != nil {
		http.Error(w, "Failed to query database", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]int{"count": count})
}
func countPlanesHandler(w http.ResponseWriter, r *http.Request) {
	// CHANGE
	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/kolesakzplanes")
	//
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM planeskz").Scan(&count)
	if err != nil {
		http.Error(w, "Failed to query database", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]int{"count": count})
}
func getCarHandler(w http.ResponseWriter, r *http.Request) {
	// Получаем параметр ID из URL
	params := mux.Vars(r)
	id := params["id"]

	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/koleso")
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	var car Element
	err = db.QueryRow("SELECT id, name, typecar, descr, image, price FROM kolesokzfin WHERE id = $1", id).Scan(&car.Id, &car.Name, &car.TypeCar, &car.Descr, &car.Image, &car.Price)
	if err != nil {
		http.Error(w, "Failed to query database", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(car)
}

func getPlaneHandler(w http.ResponseWriter, r *http.Request) {
	// Получаем параметр ID из URL
	params := mux.Vars(r)
	id := params["id"]

	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/kolesakzplanes")
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	var plane ElementPlane
	err = db.QueryRow("SELECT id, name, descr,  typeplane, image, price FROM planeskz WHERE id = $1", id).Scan(&plane.Id, &plane.Name, &plane.Descr, &plane.TypePlane, &plane.Image, &plane.Price)
	if err != nil {
		http.Error(w, "Failed to query database", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(plane)
}

func countElementsByCategoryHandler(w http.ResponseWriter, r *http.Request) {
	// Получаем параметр категории из URL
	params := mux.Vars(r)
	typecar := params["typecar"]

	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/koleso")
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM kolesokzfin WHERE typecar = $1", typecar).Scan(&count)
	if err != nil {
		http.Error(w, "Failed to query database", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]int{"count": count})
}

func getPlaneByTypePlane(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	typeplane := params["typeplane"]

	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/kolesakzplanes")
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	if typeplane == "" {
		http.Error(w, "Empty category", http.StatusBadRequest)
		return
	}

	rows, err := db.Query("SELECT id, name, descr, typeplane, image, price FROM planeskz WHERE typeplane = $1", typeplane)
	if err != nil {
		http.Error(w, "Failed to query database", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var planes []ElementPlane
	for rows.Next() {
		var plane ElementPlane
		if err := rows.Scan(&plane.Id, &plane.Name, &plane.Descr, &plane.TypePlane, &plane.Image, &plane.Price); err != nil {
			http.Error(w, "Failed to scan row", http.StatusInternalServerError)
			return
		}
		planes = append(planes, plane)
	}
	if err := rows.Err(); err != nil {
		http.Error(w, "Error iterating over rows", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(planes)
}

func getCarByTypeCar(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	typecar := params["typecar"]

	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/koleso")
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	if typecar == "" {
		http.Error(w, "Empty category", http.StatusBadRequest)
		return
	}

	rows, err := db.Query("SELECT id, name, typecar, descr, image, price FROM kolesokzfin WHERE typecar = $1", typecar)
	if err != nil {
		http.Error(w, "Failed to query database", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var cars []Element
	for rows.Next() {
		var car Element
		if err := rows.Scan(&car.Id, &car.Name, &car.TypeCar, &car.Descr, &car.Image, &car.Price); err != nil {
			http.Error(w, "Failed to scan row", http.StatusInternalServerError)
			return
		}
		cars = append(cars, car)
	}
	if err := rows.Err(); err != nil {
		http.Error(w, "Error iterating over rows", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cars)
}

func countPlanesByCategoryHandler(w http.ResponseWriter, r *http.Request) {
	// Получаем параметр категории из URL
	params := mux.Vars(r)
	typeplane := params["typeplane"]
	fmt.Println("Категория из URL:", typeplane)

	// Проверяем, не пустое ли значение категории
	if typeplane == "" {
		http.Error(w, "Empty category", http.StatusBadRequest)
		return
	}

	db, err := sql.Open("pgx", "postgresql://postgres:root@localhost/kolesakzplanes")
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM planeskz WHERE typeplane = $1", typeplane).Scan(&count)
	if err != nil {
		http.Error(w, "Failed to query database", http.StatusInternalServerError)
		return
	}

	fmt.Println("Количество элементов:", count)

	json.NewEncoder(w).Encode(map[string]int{"count": count})
}
