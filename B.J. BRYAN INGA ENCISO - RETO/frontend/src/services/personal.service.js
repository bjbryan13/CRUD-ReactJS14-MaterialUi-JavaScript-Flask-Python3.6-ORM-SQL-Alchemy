import http from "../http-common";

class PersonalDataService {
  getAll() {
    return http.get("/personal");
  }

  getId(id) {
    return http.get(`/personal/${id}`);
  }

  create(data) {
    return http.post("/add_new_personal", data);
  }

  update(id, data) {
    return http.put(`/update_personal_details/${id}`, data);
  }

  delete(id) {
    return http.get(`/delete_personal_by_id/${id}`);
  }

}

export default new PersonalDataService();