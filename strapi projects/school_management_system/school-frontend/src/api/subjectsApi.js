import api from "./axios";
import { normalizeResponse, getEntityId } from "../utils/strapiNormalize";

export const getSubjects = async () => {
  const res = await api.get("/subjects?populate=*");
  return normalizeResponse(res.data);
};

export const getSubject = async (id) => {
  const targetId = getEntityId(id);
  const res = await api.get(`/subjects/${targetId}?populate=*`);
  return normalizeResponse(res.data);
};

export const createSubject = async (data) => {
  const payload = {
    data: {
      name: data.name,
      description: data.description || "",
      ...(data.teacher ? { teacher: data.teacher } : {}),
      ...(data.students && data.students.length > 0 ? { students: data.students } : {}),
    },
  };
  const res = await api.post("/subjects", payload);
  return normalizeResponse(res.data);
};

export const updateSubject = async (id, data) => {
  const targetId = getEntityId(id);
  const payload = {
    data: {
      name: data.name,
      description: data.description || "",
      teacher: data.teacher || null,
      ...(data.students !== undefined ? { students: data.students } : {}),
    },
  };
  const res = await api.put(`/subjects/${targetId}`, payload);
  return normalizeResponse(res.data);
};

export const deleteSubject = async (id) => {
  const targetId = getEntityId(id);
  const res = await api.delete(`/subjects/${targetId}`);
  return res.data;
};
