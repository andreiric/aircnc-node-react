import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Spot from '../models/Spot';
import User from '../models/User';

export default class DashboardController {

  static async show(req: Request, res: Response) {
    const spotRepository = getRepository(Spot);
    const userRepository = getRepository(User);

    const { user_id } = req.headers;

    const user = await userRepository.findOne(user_id[0]);

    const spots = await spotRepository.find({ user: user });

    return res.json(spots);
  }

}
