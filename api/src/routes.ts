import { UserController } from "./controller/UserController";
import { WeatherController } from "./controller/WeatherController";

export const Routes = [
    //User
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    },
    // Weather
    {
        method: "get",
        route: "/weather",
        controller: WeatherController,
        action: "last"
    }];