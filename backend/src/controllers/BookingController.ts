import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Booking from '../models/Booking';
import User from '../models/User';
import Spot from '../models/Spot';

export default class BookingController {

  static async store(req: Request, res: Response) {
    const bookingRepository = getRepository(Booking);
    const userRepository = getRepository(User);
    const spotRepository = getRepository(Spot);

    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const user = await userRepository.findOne(user_id[0]);
    const spot = await spotRepository.findOne(spot_id);

    let booking = new Booking();
    booking.user = user;
    booking.spot = spot;
    booking.date = date;
    booking.appoved = false;

    booking = await bookingRepository.save(booking);

    // const ownerSocket = req.filter('connectedUsers');

    return res.json(booking);
  }

}
