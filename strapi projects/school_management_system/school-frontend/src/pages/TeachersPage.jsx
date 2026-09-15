import React, { useState } from "react";
import {
  Plus,
  Mail,
  Phone,
  BookOpen,
  Users,
  Edit2,
  Trash2,
  School,
  Search,
  CheckCircle2,
} from "lucide-react";
import { useTeachers, useTeacherMutations } from "../hooks/useTeachers";
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

export default function TeachersPage() {
  const { data: teachers = [], isLoading, isError, error } = useTeachers();
  const { data: subjects = [] } = useSubjects();
  const { createTeacher, updateTeacher, deleteTeacher } = useTeacherMutations();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [deletingTeacher, setDeletingTeacher] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleOpenCreateModal = () => {
    setEditingTeacher(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      subject: teacher.subject ? getEntityId(teacher.subject) : "",
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Teacher name is required";
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
      if (editingTeacher) {
        await updateTeacher.mutateAsync({
          id: getEntityId(editingTeacher),
          data: formData,
        });
      } else {
        await createTeacher.mutateAsync(formData);
      }
      setIsFormModalOpen(false);
    } catch (err) {
      console.error("Failed to save teacher:", err);
      setFormErrors({
        submit: err.response?.data?.error?.message || "Failed to save teacher record. Please try again.",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTeacher) return;
    try {
      await deleteTeacher.mutateAsync(getEntityId(deletingTeacher));
      setDeletingTeacher(null);
    } catch (err) {
      console.error("Failed to delete teacher:", err);
    }
  };

  // Filter teachers by search term
  const filteredTeachers = teachers.filter((t) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = t.name?.toLowerCase().includes(term);
    const emailMatch = t.email?.toLowerCase().includes(term);
    const phoneMatch = t.phone?.toLowerCase().includes(term);
    const subjectMatch = t.subject?.name?.toLowerCase().includes(term);
    return nameMatch || emailMatch || phoneMatch || subjectMatch;
  });

  // Prepare subject options for dropdown
  const subjectOptions = subjects.map((sub) => ({
    value: getEntityId(sub),
    label: sub.name,
    sublabel: sub.teacher ? `Assigned to ${sub.teacher.name}` : "Unassigned",
  }));

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" text="Loading teachers from Strapi..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-center">
        <h3 className="text-base font-semibold text-rose-800">Error Loading Teachers</h3>
        <p className="text-sm text-rose-600 mt-1">{error?.message || "Could not connect to Strapi API."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search teachers by name, email, subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs"
          />
        </div>

        {/* Add Button */}
        <Button variant="primary" icon={Plus} onClick={handleOpenCreateModal}>
          Add Teacher
        </Button>
      </div>

      {/* Teachers Grid or Empty State */}
      {filteredTeachers.length === 0 ? (
        <EmptyState
          icon={School}
          title={searchTerm ? "No matching teachers found" : "No teachers registered yet"}
          description={
            searchTerm
              ? "Try adjusting your search terms or clear the filter."
              : "Start by adding your first teacher to assign subjects and manage students."
          }
          actionLabel={searchTerm ? "Clear Search" : "Add New Teacher"}
          actionIcon={searchTerm ? null : Plus}
          onAction={searchTerm ? () => setSearchTerm("") : handleOpenCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTeachers.map((teacher) => {
            const studentCount = Array.isArray(teacher.students) ? teacher.students.length : 0;
            const assignedSubject = teacher.subject;

            return (
              <Card key={getEntityId(teacher)}>
                <Card.Header>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {teacher.name
                        ? teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        : "T"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base leading-tight">
                        {teacher.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">Faculty Member</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(teacher)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Teacher"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingTeacher(teacher)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Teacher"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card.Header>

                <Card.Body className="space-y-3">
                  {/* Contact Info */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{teacher.email || "No email provided"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{teacher.phone || "No phone number"}</span>
                    </div>
                  </div>

                  {/* Assigned Subject & Students Stats */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                        Assigned Subject
                      </span>
                      {assignedSubject ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {assignedSubject.name}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">None</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-500" />
                        Students Enrolled
                      </span>
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {studentCount} {studentCount === 1 ? "student" : "students"}
                      </span>
                    </div>
                  </div>
                </Card.Body>

                <Card.Footer>
                  <span className="text-slate-400">ID: {teacher.id}</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active
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
        title={editingTeacher ? "Edit Teacher" : "Add New Teacher"}
        subtitle={
          editingTeacher
            ? "Update teacher information and subject assignment"
            : "Enter teacher details to register them in the system"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formErrors.submit && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {formErrors.submit}
            </div>
          )}

          <Input
            label="Teacher Full Name"
            name="name"
            placeholder="e.g. Dr. Robert Taylor"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="e.g. robert.taylor@school.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={formErrors.email}
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="e.g. 0771234567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <Select
            label="Assigned Subject"
            name="subject"
            placeholder="-- Select a Subject (Optional) --"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            options={subjectOptions}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="secondary"
              onClick={() => setIsFormModalOpen(false)}
              disabled={createTeacher.isPending || updateTeacher.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={createTeacher.isPending || updateTeacher.isPending}
            >
              {editingTeacher ? "Save Changes" : "Create Teacher"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        isOpen={!!deletingTeacher}
        onClose={() => setDeletingTeacher(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingTeacher?.name}
        itemType="Teacher"
        isLoading={deleteTeacher.isPending}
      />
    </div>
  );
}
