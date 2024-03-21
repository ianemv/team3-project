import authorRouter from './author.router.js'
import authRouter from './auth.routes';
const router = express.Router();

// Mount routers
router.use('/api/authors', authorRouter);
router.use('/auth', authRouter);

export default router;