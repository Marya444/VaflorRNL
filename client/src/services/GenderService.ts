import AxiosInstance from "../AxiosInstance";

const GenderService = {

  loadGender: async () => {
    return AxiosInstance.get("/loadGenders")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  getGender: async (
    genderId: number
  ) => {
    return AxiosInstance.get(`/getGender/${genderId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

   storeGender: async (data: any) => {
    return AxiosInstance.post("/storeGender", data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};


export default GenderService;