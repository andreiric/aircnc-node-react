import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from './../models/User';

export default class SessionController {

  static async store(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { email } = req.body;

    let user = await userRepository.findOne({ where: { email } });

    if (!user) {
      user = await userRepository.save({ email });
    }
    return res.json(user);
  }

}

