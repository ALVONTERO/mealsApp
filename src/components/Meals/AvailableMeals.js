import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import axios from "axios";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        "https://react-http-base-default-rtdb.firebaseio.com/meals.json"
      );
      const data = response.data;
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    };
    fetchData();
  }, []);
  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.key}
      id={meal.key}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
