import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Weather } from "../entity/Weather";


export class WeatherController {
    private weatherRepository = getRepository(Weather);

    async last(request: Request, response: Response, next: NextFunction) {
        if ((await this.weatherRepository.find()).length === 0) {
            await this.weatherRepository.save(new Weather(5, 8));
        }

        const lastWeather: Weather = (await this.weatherRepository.find())[0];

        if ((new Date().getTime() - lastWeather.timestamp.getTime()) > 1000 * 60 * 60 * 12) { //12 hours
            await this.weatherRepository.remove(lastWeather);
            const maxTempChange = 5;
            const newMinTemp = lastWeather.minTemperature - maxTempChange + Math.random() * 2 * maxTempChange;
            //Add one to make sure that newMaxTemp > newMinTemp
            const newMaxTemp = newMinTemp + 1 + Math.random() * maxTempChange; 
            const newWeather = new Weather(Math.trunc(newMinTemp), Math.trunc(newMaxTemp));
            await this.weatherRepository.save(newWeather);

            return newWeather;
        }
        else {
            return lastWeather;
        }
    }
}