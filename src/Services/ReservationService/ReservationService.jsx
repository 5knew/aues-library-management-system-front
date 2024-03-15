import axios from 'axios';

const BASE_URL = 'http://localhost:8083/api/reservations';

const createReservation = (reservationData) => {
    return axios.post(BASE_URL, reservationData);
};

const updateReservation = (id, reservationData) => {
    return axios.put(`${BASE_URL}/${id}`, reservationData);
};

const getReservationById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

const deleteReservation = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};

const getAllReservations = () => {
    return axios.get(BASE_URL);
};

const getReservationsByUserId = (userId) => {
    return axios.get(`${BASE_URL}/user/${userId}`);
};

const getReservationsByBookId = (bookId) => {
    return axios.get(`${BASE_URL}/book/${bookId}`);
};

const getReservationsByStatus = (status) => {
    return axios.get(`${BASE_URL}/status/${status}`);
};

const searchReservations = (searchCriteria) => {
    return axios.post(`${BASE_URL}/search`, searchCriteria);
};

export const ReservationService = {
    createReservation,
    updateReservation,
    getReservationById,
    deleteReservation,
    getAllReservations,
    getReservationsByUserId,
    getReservationsByBookId,
    getReservationsByStatus,
    searchReservations
};
