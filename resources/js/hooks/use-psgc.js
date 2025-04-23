import axios from 'axios';

export const getProvinces = () => {
    return axios.get('https://psgc.gitlab.io/api/provinces/');
};

export const getCities = (provinceCode) => {
    return axios.get(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`);
};

export const getBarangays = (cityCode) => {
    return axios.get(`https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays/`);
};
