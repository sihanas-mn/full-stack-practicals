import React, { useState } from "react";
import {
  Plus,
  BookOpen,
  School,
  Users,
  Edit2,
  Trash2,
  Search,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useSubjects, useSubjectMutations } from "../hooks/useSubjects";
import { useTeachers } from "../hooks/useTeachers";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { getEntityId } from "../utils/strapiNormalize";

export default function SubjectsPage() {
  const { data: subjects = [], isLoading, isError, error } = useSubjects();
  const { data: teachers = [] } = useTeachers();
  const { createSubject, updateSubject, deleteSubject } = useSubjectMutations();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deletingSubject, setDeletingSubject] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teacher: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleOpenCreateModal = () => {
    setEditingSubject(null);
    setFormData({
      name: "",
      description: "",
      teacher: "",
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name || "",
      description: subject.description || "",
      teacher: subject.teacher ? getEntityId(subject.teacher) : "",
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Subject name is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingSubject) {
        await updateSubject.mutateAsync({
          id: getEntityId(editingSubject),
          data: formData,
        });
      } else {
        await createSubject.mutateAsync(formData);
      }
      setIsFormModalOpen(false);
    } catch (err) {
      console.error("Failed to save subject:", err);
      setFormErrors({
        submit: err.response?.data?.error?.message || "Failed to save subject record. Please try again.",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingSubject) return;
    try {
      await deleteSubject.mutateAsync(getEntityId(deletingSubject));
      setDeletingSubject(null);
    } catch (err) {
      console.error("Failed to delete subject:", err);
    }
  };

  // Filter subjects
  const filteredSubjects = subjects.filter((sub) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = sub.name?.toLowerCase().includes(term);
    const descMatch = sub.description?.toLowerCase().includes(term);
    const teacherMatch = sub.teacher?.name?.toLowerCase().includes(term);
    return nameMatch || descMatch || teacherMatch;
  });

  // Prepare teacher options
  const teacherOptions = teachers.map((t) => ({
    value: getEntityId(t),
    label: t.name,
    sublabel: t.email,
  }));

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" text="Loading subjects from Strapi..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-center">
        <h3 className="text-base font-semibold text-rose-800">Error Loading Subjects</h3>
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
            placeholder="Search subjects by name, description, teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs"
          />
        </div>

        {/* Add Subject Button */}
        <Button variant="primary" icon={Plus} onClick={handleOpenCreateModal}>
          Add Subject
        </Button>
      </div>

      {/* Grid or Empty */}
      {filteredSubjects.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={searchTerm ? "No matching subjects found" : "No academic subjects added"}
          description={
            searchTerm
              ? "Try searching for a different keyword."
              : "Create academic subjects, attach descriptions, and assign faculty leads."
          }
          actionLabel={searchTerm ? "Clear Search" : "Add New Subject"}
          actionIcon={searchTerm ? null : Plus}
          onAction={searchTerm ? () => setSearchTerm("") : handleOpenCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((subject) => {
            const studentCount = Array.isArray(subject.students) ? subject.students.length : 0;
            const assignedTeacher = subject.teacher;

            return (
              <Card key={getEntityId(subject)}>
                <Card.Header>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base leading-tight">
                        {subject.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">Academic Subject</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(subject)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Subject"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingSubject(subject)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card.Header>

                <Card.Body className="space-y-4">
                  {/* Description */}
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {subject.description || "No syllabus description provided for this subject."}
                    </p>
                  </div>

                  {/* Assigned Teacher & Students stats */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-blue-500" />
                        Subject Teacher
                      </span>
                      {assignedTeacher ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {assignedTeacher.name}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Unassigned</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-500" />
                        Students Enrolled
                      </span>
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {studentCount} {studentCount === 1 ? "student" : "students"}
                      </span>
                    </div>
                  </div>
                </Card.Body>

                <Card.Footer>
                  <span className="text-slate-400">ID: {subject.id}</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active Course
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
        title={editingSubject ? "Edit Subject" : "Create New Subject"}
        subtitle={
          editingSubject
            ? "Modify curriculum details and assigned faculty lead"
            : "Define subject name, description, and assign teacher"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formErrors.submit && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {formErrors.submit}
            </div>
          )}

          <Input
            label="Subject Name"
            name="name"
            placeholder="e.g. Physics & Astronomy"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
              Description / Syllabus
            </label>
            <textarea
              rows={3}
              placeholder="Outline topics covered, prerequisites, and learning goals..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block w-full rounded-lg border border-slate-300 text-sm px-3.5 py-2.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>

          <Select
            label="Assigned Teacher"
            name="teacher"
            placeholder="-- Select Faculty Member (Optional) --"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            options={teacherOptions}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="secondary"
              onClick={() => setIsFormModalOpen(false)}
              disabled={createSubject.isPending || updateSubject.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={createSubject.isPending || updateSubject.isPending}
            >
              {editingSubject ? "Save Changes" : "Create Subject"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        isOpen={!!deletingSubject}
        onClose={() => setDeletingSubject(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingSubject?.name}
        itemType="Subject"
        isLoading={deleteSubject.isPending}
      />
    </div>
  );
}
