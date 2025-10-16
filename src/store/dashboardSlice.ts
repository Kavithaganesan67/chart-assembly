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
  },
});

export const {
  setCurrentDashboard,
  updateDashboardLayout,
  saveDashboard,
  addWidgetToDashboard,
  removeWidgetFromDashboard,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
