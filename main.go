package main

import "github.com/gofiber/fiber/v2"

type Paslon struct {
	Nama string `json:"nama"`
	Wakil string `json:"wakil"`
	Urut string `json:"nourut"`
}


var ListPaslon []*Paslon = make([]*Paslon, 0)

func main() {
	app := fiber.New()


	//Get Data
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"API":"Service untuk Data Pasangan Calon Bupati",
			"kode_status" : "1",
			"status" : "success",
			"data": ListPaslon,
		})
	})


	//Post Data
	app.Post("/", func(c *fiber.Ctx) error {

		input := &Paslon{}

		if err:= c.BodyParser(input); err != nil{
			return c.Status(400).JSON(fiber.Map{
				"error": err.Error(),
			})
		}

		ListPaslon = append(ListPaslon, input)
		return c.JSON(fiber.Map{
			"message": "success",
		})
	})


	//edit lagi
	app.Listen(":8080")
}

