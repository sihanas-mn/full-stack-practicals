import api from "./axios";
import { normalizeResponse, getEntityId } from "../utils/strapiNormalize";

export const getTeachers = async () => {
  const res = await api.get("/teachers?populate=*");
  return normalizeResponse(res.data);
};

export const getTeacher = async (id) => {
  const targetId = getEntityId(id);
  const res = await api.get(`/teachers/${targetId}?populate=*`);
  return normalizeResponse(res.data);
};

export const createTeacher = async (data) => {
  const payload = {
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      ...(data.subject ? { subject: data.subject } : {}),
      ...(data.students && data.students.length > 0 ? { students: data.students } : {}),
    },
  };
  const res = await api.post("/teachers", payload);
  return normalizeResponse(res.data);
};

export const updateTeacher = async (id, data) => {
  const targetId = getEntityId(id);
  const payload = {
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      // In Strapi, passing null or documentId/id unlinks/links relation
      subject: data.subject || null,
      ...(data.students !== undefined ? { students: data.students } : {}),
    },
  };
  const res = await api.put(`/teachers/${targetId}`, payload);
  return normalizeResponse(res.data);
};

export const deleteTeacher = async (id) => {
  const targetId = getEntityId(id);
  const res = await api.delete(`/teachers/${targetId}`);
  return res.data;
};
