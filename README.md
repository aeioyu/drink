<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Drink.Co</h3>
  <h3 align="center">Vending Machine Application</h3>

  <p align="center">
     an web application to run on vending machine able to manage stock on system admin and show the
     product on the vending machine screen. with ability to select and buy a drink that you like. 
     <i>ps. the Drink naming is for fun :)</i>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# About The Project

![Overview Architecture][product-screenshot]

## Built With

this project is build with Typescript on mono repo with yarn workspace. contain 3 application in folder packages.

- [vending-ui](https://github.com/aeioyu/drink/tree/main/packages/vending-ui) (NextJS)
- [vending-api](https://github.com/aeioyu/drink/tree/main/packages/vending-api) (NestJS, PostgresQL)
- [vending-admin](https://github.com/aeioyu/drink/tree/main/packages/vending-admin) (PostgresQL)
  <br />

<!-- GETTING STARTED -->

# Getting Started

This is an example of how each application work with instructions on setting up your project locally.
this monorepo required `yarn` as a package manager because npm not support workspace.

## Vending Machine UI

This is an example of how to setup Vending Machine UI application. running on port 3000

### Feature

- Machine Product listing page. able to show product of machine that selected.
- Cart. able to add product to cart with price calculation.
- Checkout. able to adjust the stock of purchased product. and show product that not available.

### Demo Environment

[https://vending-machine-by-drink-ui.herokuapp.com/](https://vending-machine-by-drink-ui.herokuapp.com/)

### Installation

1. go to packages/vending-ui and create `env.local` file by follow on env.local.example file.
2. on the root of project run
   ```sh
   yarn install
   ```
3. to start only ui app use this command.

   ```sh
   yarn start:ui
   ```

   or start all application together.

   ```sh
   yarn start
   ```

## Vending Machine API

Restful API build with NestJS and connect with PostgresQL. This is an example of how to setup vending machine api. running on port 8001

### Demo Environment

[https://vending-machine-by-drink-api.herokuapp.com/](https://vending-machine-by-drink-api.herokuapp.com/)

### API Document

[Go To Docs](https://documenter.getpostman.com/view/981639/Tz5s5cDE)

### Installation

1. on the root of project run
   ```sh
   yarn install
   ```
2. to start only ui app use this command.

   ```sh
   yarn start:ui
   ```

   or start all application together.

   ```sh
   yarn start
   ```

### Database ER Diagram

![API ER][er-diagram]

## Admin System

Admin system to manage machine, products and stock of application. This is an example of how to setup Admin application. default running on port 8000

### Feature

- Machines management, able to Create, Update, Delete.
- Stock Management, able to manage product stock on machine.
- Send Email notification to admin by email.

### Demo Environment

[https://vending-machine-by-drink-admin.herokuapp.com/](https://vending-machine-by-drink-admin.herokuapp.com/)

### Installation

1. go to packages/vending-admin and create `env.local` file by follow on env.local.example file.
2. on the root of project run
   ```sh
   yarn install
   ```
3. to start only ui app use this command.

   ```sh
   yarn start:ui
   ```

   or start all application together.

   ```sh
   yarn start
   ```

## Roadmap

- Product Management feature with Create, Update, Delete product on the system.
- Configuration Management feature able to config stock indicator for stock notification.
- Authorization Feature to manage permission to access admin system.
- Report, to show product stock report for admin to manage product.

[product-screenshot]: docs/images/achitect.jpeg
[er-diagram]: docs/images/er.jpeg
