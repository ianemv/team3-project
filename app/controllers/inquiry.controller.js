import Inquiry from '../models/inq.model.js';

export const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json({ inquiries });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.status(200).json({ inquiry });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { name, email, message }, { new: true });
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.status(200).json({ message: 'Inquiry updated successfully', inquiry });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};