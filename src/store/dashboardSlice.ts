import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dashboard, DashboardWidget } from '@/types/widget';

interface DashboardState {
  dashboards: Dashboard[];
  currentDashboard: Dashboard | null;
}

const initialState: DashboardState = {
  dashboards: JSON.parse(localStorage.getItem('dashboards') || '[]'),
  currentDashboard: null,
};

const dashboardSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    setCurrentDashboard: (state, action: PayloadAction<Dashboard>) => {
      state.currentDashboard = action.payload;
    },
    updateDashboardLayout: (state, action: PayloadAction<DashboardWidget[]>) => {
      if (state.currentDashboard) {
        state.currentDashboard.widgets = action.payload;
      }
    },
    saveDashboard: (state) => {
      if (state.currentDashboard) {
        const index = state.dashboards.findIndex(d => d.id === state.currentDashboard!.id);
        if (index !== -1) {
          state.dashboards[index] = state.currentDashboard;
        } else {
          state.dashboards.push(state.currentDashboard);
        }
        localStorage.setItem('dashboards', JSON.stringify(state.dashboards));
      }
    },
    addWidgetToDashboard: (state, action: PayloadAction<DashboardWidget>) => {
      if (state.currentDashboard) {
        state.currentDashboard.widgets.push(action.payload);
      }
    },
    removeWidgetFromDashboard: (state, action: PayloadAction<string>) => {
      if (state.currentDashboard) {
        state.currentDashboard.widgets = state.currentDashboard.widgets.filter(
          w => w.i !== action.payload
        );
      }
    },
    loadDashboard: (state, action: PayloadAction<string>) => {
      const dashboard = state.dashboards.find(d => d.id === action.payload);
      if (dashboard) {
        state.currentDashboard = dashboard;
      }
    },
    createNewDashboard: (state, action: PayloadAction<string>) => {
      const newDashboard: Dashboard = {
        id: Date.now().toString(),
        name: action.payload,
        widgets: [],
        createdAt: new Date().toISOString(),
      };
      state.currentDashboard = newDashboard;
    },
    deleteDashboard: (state, action: PayloadAction<string>) => {
      state.dashboards = state.dashboards.filter(d => d.id !== action.payload);
      localStorage.setItem('dashboards', JSON.stringify(state.dashboards));
      if (state.currentDashboard?.id === action.payload) {
        state.currentDashboard = null;
      }
    },
  },
});

export const {
  setCurrentDashboard,
  updateDashboardLayout,
  saveDashboard,
  addWidgetToDashboard,
  removeWidgetFromDashboard,
  loadDashboard,
  createNewDashboard,
  deleteDashboard,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
