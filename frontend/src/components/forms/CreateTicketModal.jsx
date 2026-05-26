import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { TICKET_PRIORITY, PRIORITY_LABELS } from '../../constants/ticketConstants';

const initialForm = {
  subject: '',
  customerEmail: '',
  priority: TICKET_PRIORITY.LOW,
  description: '',
};

export const CreateTicketModal = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onCreate(form);
      setForm(initialForm); // reset on success
      onClose(); // close modal
    } catch (err) {
      // toast is handled in useTickets hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={!isSubmitting ? onClose : undefined} title="Create New Ticket">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input 
            type="text"
            name="subject"
            required
            minLength={3}
            value={form.subject}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Brief description of the issue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Email</label>
          <input 
            type="email"
            name="customerEmail"
            required
            value={form.customerEmail}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="customer@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select 
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
          >
            {Object.values(TICKET_PRIORITY).map(priority => (
              <option key={priority} value={priority}>{PRIORITY_LABELS[priority]}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            name="description"
            rows={4}
            required
            minLength={10}
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Detailed explanation of the issue..."
          />
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button variant="primary" type="submit" loading={isSubmitting}>Create Ticket</Button>
        </div>
      </form>
    </Modal>
  );
};
