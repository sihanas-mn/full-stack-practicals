import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../api/teachersApi";

export const useTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
};

export const useTeacher = (id) => {
  return useQuery({
    queryKey: ["teachers", id],
    queryFn: () => getTeacher(id),
    enabled: !!id,
  });
};

export const useTeacherMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTeacher(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return {
    createTeacher: createMutation,
    updateTeacher: updateMutation,
    deleteTeacher: deleteMutation,
  };
};
