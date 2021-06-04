import * as express from 'express';
import { Request, Response } from 'express';
import { SC_OK } from '../constants/app';

const router = express.Router();

const response = (res: Response, code: number, data: any) => {
  res.status(code).send({
    ...data,
  });
};

router.get('/', (req: Request, res: Response) => {
  response(res, SC_OK, { message: 'Server is running!' });
});

export default router;
