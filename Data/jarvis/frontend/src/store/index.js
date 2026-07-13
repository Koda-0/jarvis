import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import skillsReducer   from './slices/skillsSlice';
import blogsReducer    from './slices/blogsSlice';
import servicesReducer from './slices/servicesSlice';

export default configureStore({
  reducer: {
    projects: projectsReducer,
    skills:   skillsReducer,
    blogs:    blogsReducer,
    services: servicesReducer,
  },
});
