import api from "./axios";
import { normalizeResponse, getEntityId } from "../utils/strapiNormalize";

export const getStudents = async () => {
  const res = await api.get("/students?populate=*");
  return normalizeResponse(res.data);
};

export const getStudent = async (id) => {
  const targetId = getEntityId(id);
  const res = await api.get(`/students/${targetId}?populate=*`);
  return normalizeResponse(res.data);
};

export const createStudent = async (data) => {
  const payload = {
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      teachers: data.teachers || [],
      subjects: data.subjects || [],
    },
  };
  const res = await api.post("/students", payload);
  return normalizeResponse(res.data);
};

export const updateStudent = async (id, data) => {
  const targetId = getEntityId(id);
  const payload = {
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      teachers: data.teachers || [],
      subjects: data.subjects || [],
    },
  };
  const res = await api.put(`/students/${targetId}`, payload);
  return normalizeResponse(res.data);
};

export const deleteStudent = async (id) => {
  const targetId = getEntityId(id);
  const res = await api.delete(`/students/${targetId}`);
  return res.data;
};
