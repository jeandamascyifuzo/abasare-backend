import dotEnv from 'dotenv';
import express from 'express';
import { connect } from './dataBase/db.config'
import bodyParser from 'body-parser';
import options from './utils/options.js';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";

import usersRoutes from './routes/User'
import registerDriverRoutes from './routes/RegisterDriver'
import driversProfileRoutes from './routes/DriverProfile'
import clientsProfileRoutes from './routes/ClientProfile'
import bookingRoutes from './routes/Booking'
import newRidesRoutes from './routes/NewRides'
import nationalityRoutes from './routes/Nation'
import carRoutes from './routes/Cars'
import townRoutes from './routes/Town'
import bookingHistoryRoutes from './routes/BookingHistory'
import userProfileRoutes from './routes/UserProfile'
import realBookingRoutes from './routes/RealBooking'

const app = express();
app.use(cors());
dotEnv.config()

const PORT = process.env.PORT || 5000;
const specs = swaggerJsDoc(options);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Weclome to Abasare.');
});

app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/v1/user', usersRoutes);
app.use('/api/v1/driver', registerDriverRoutes);
app.use('/api/v1/drivers/profile', driversProfileRoutes);
app.use('/api/v1/client', clientsProfileRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/rides', newRidesRoutes);
app.use('/api/v1/nations', nationalityRoutes);
app.use('/api/v1/car', carRoutes);
app.use('/api/v1/town', townRoutes);
app.use('/api/v1/history/booking', bookingHistoryRoutes);
app.use('/api/v1/profile/user', userProfileRoutes);
app.use('/api/v1/real_booking', realBookingRoutes);

connect().then(() => {
  console.log('Database connected')
  app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
})