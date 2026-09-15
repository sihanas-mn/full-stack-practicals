import React, { useState } from "react";
import {
  Plus,
  Mail,
  Phone,
  BookOpen,
  School,
  Users,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
} from "lucide-react";
import { useStudents, useStudentMutations } from "../hooks/useStudents";
import { useTeachers } from "../hooks/useTeachers";
import { useSubjects } from "../hooks/useSubjects";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { getEntityId } from "../utils/strapiNormalize";

export default function StudentsPage() {
  const { data: students = [], isLoading, isError, error } = useStudents();
  const { data: teachers = [] } = useTeachers();
  const { data: subjects = [] } = useSubjects();
  const { createStudent, updateStudent, deleteStudent } = useStudentMutations();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    teachers: [],
    subjects: [],
  });
  const [formErrors, setFormErrors] = useState({});

  const handleOpenCreateModal = () => {
    setEditingStudent(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      teachers: [],
      subjects: [],
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      teachers: Array.isArray(student.teachers)
        ? student.teachers.map((t) => getEntityId(t))
        : [],
      subjects: Array.isArray(student.subjects)
        ? student.subjects.map((s) => getEntityId(s))
        : [],
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Student name is required";
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingStudent) {
        await updateStudent.mutateAsync({
          id: getEntityId(editingStudent),
          data: formData,
        });
      } else {
        await createStudent.mutateAsync(formData);
      }
      setIsFormModalOpen(false);
    } catch (err) {
      console.error("Failed to save student:", err);
      setFormErrors({
        submit: err.response?.data?.error?.message || "Failed to save student record. Please try again.",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingStudent) return;
    try {
      await deleteStudent.mutateAsync(getEntityId(deletingStudent));
      setDeletingStudent(null);
    } catch (err) {
      console.error("Failed to delete student:", err);
    }
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = s.name?.toLowerCase().includes(term);
    const emailMatch = s.email?.toLowerCase().includes(term);
    const phoneMatch = s.phone?.toLowerCase().includes(term);
    return nameMatch || emailMatch || phoneMatch;
  });

  // Prepare select options
  const teacherOptions = teachers.map((t) => ({
    value: getEntityId(t),
    label: t.name,
    sublabel: t.subject ? `Subject: ${t.subject.name}` : undefined,
  }));

  const subjectOptions = subjects.map((sub) => ({
    value: getEntityId(sub),
    label: sub.name,
    sublabel: sub.teacher ? `Teacher: ${sub.teacher.name}` : undefined,
  }));

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" text="Loading students from Strapi..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-center">
        <h3 className="text-base font-semibold text-rose-800">Error Loading Students</h3>
        <p className="text-sm text-rose-600 mt-1">{error?.message || "Could not connect to Strapi API."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search students by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs"
          />
        </div>

        {/* Add Student Button */}
        <Button variant="primary" icon={Plus} onClick={handleOpenCreateModal}>
          Add Student
        </Button>
      </div>

      {/* Grid or Empty */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={Users}
          title={searchTerm ? "No matching students found" : "No students enrolled yet"}
          description={
            searchTerm
              ? "Try adjusting your search terms."
              : "Register your first student and assign them to teachers and academic subjects."
          }
          actionLabel={searchTerm ? "Clear Search" : "Add New Student"}
          actionIcon={searchTerm ? null : Plus}
          onAction={searchTerm ? () => setSearchTerm("") : handleOpenCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((student) => {
            const studentTeachers = Array.isArray(student.teachers) ? student.teachers : [];
            const studentSubjects = Array.isArray(student.subjects) ? student.subjects : [];

            return (
              <Card key={getEntityId(student)}>
                <Card.Header>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      {student.name
                        ? student.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        : "S"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base leading-tight">
                        {student.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">Enrolled Student</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(student)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Student"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingStudent(student)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Student"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card.Header>

                <Card.Body className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{student.email || "No email provided"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{student.phone || "No phone number"}</span>
                    </div>
                  </div>

                  {/* Subjects List */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Enrolled Subjects ({studentSubjects.length})</span>
                    </div>
                    {studentSubjects.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {studentSubjects.map((sub) => (
                          <span
                            key={getEntityId(sub)}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                          >
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No subjects assigned</p>
                    )}
                  </div>

                  {/* Teachers List */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-blue-500" />
                      <span>Assigned Teachers ({studentTeachers.length})</span>
                    </div>
                    {studentTeachers.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {studentTeachers.map((teach) => (
                          <span
                            key={getEntityId(teach)}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            {teach.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No teachers assigned</p>
                    )}
                  </div>
                </Card.Body>

                <Card.Footer>
                  <span className="text-slate-400">ID: {student.id}</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Enrolled
                  </span>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingStudent ? "Edit Student" : "Register New Student"}
        subtitle={
          editingStudent
            ? "Update student profile and academic enrollments"
            : "Fill in student information and select subjects & teachers"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formErrors.submit && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {formErrors.submit}
            </div>
          )}

          <Input
            label="Student Full Name"
            name="name"
            placeholder="e.g. Emma Davis"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="e.g. emma.davis@student.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={formErrors.email}
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="e.g. 0722222222"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          {/* Multi-select Subjects */}
          <Select
            label="Enrolled Subjects"
            name="subjects"
            isMulti
            placeholder="Select one or more subjects..."
            value={formData.subjects}
            onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
            options={subjectOptions}
          />

          {/* Multi-select Teachers */}
          <Select
            label="Assigned Teachers"
            name="teachers"
            isMulti
            placeholder="Select one or more teachers..."
            value={formData.teachers}
            onChange={(e) => setFormData({ ...formData, teachers: e.target.value })}
            options={teacherOptions}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="secondary"
              onClick={() => setIsFormModalOpen(false)}
              disabled={createStudent.isPending || updateStudent.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={createStudent.isPending || updateStudent.isPending}
            >
              {editingStudent ? "Save Changes" : "Register Student"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        isOpen={!!deletingStudent}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingStudent?.name}
        itemType="Student"
        isLoading={deleteStudent.isPending}
      />
    </div>
  );
}
