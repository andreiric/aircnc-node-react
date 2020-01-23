import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';

import Spot from '../models/Spot';
import User from '../models/User';

export default class SpotController {

  static async index(req: Request, res: Response) {
    const spotRepository = getRepository(Spot);

    const { tech } = req.query;

    const spots = await spotRepository.find({ techs: Like(`%${tech}%`) });

    return res.json(spots);
  }


  static async store(req: Request, res: Response) {
    const spotRepository = getRepository(Spot);
    const userRepository = getRepository(User);

    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await userRepository.findOne(user_id[0]);
    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    let spot = new Spot();
    spot.user = user;
    spot.thumbnail = filename;
    spot.company = company;
    spot.techs = techs;
    spot.price = price;

    spot = await spotRepository.save(spot);
    return res.json(spot)
  }

}
