import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { validateRequest } from '../middleware/validate';
import { createContactInquirySchema } from '../validators/contact.validator';

const router = Router();

// POST /api/contact - Submit a contact form inquiry
router.post(
  '/',
  validateRequest(createContactInquirySchema),
  ContactController.submitInquiry
);

// GET /api/contact - List all inquiries
router.get('/', ContactController.getInquiries);

export default router;
