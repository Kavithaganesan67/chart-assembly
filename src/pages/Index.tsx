import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard, BoxSelect, Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { createNewDashboard, deleteDashboard, loadDashboard } from '@/store/dashboardSlice';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dashboards = useAppSelector((state) => state.dashboards.dashboards);

  const handleCreateDashboard = () => {
    dispatch(createNewDashboard('New Dashboard'));
    navigate('/dashboard');
  };

  const handleLoadDashboard = (dashboardId: string) => {
    dispatch(loadDashboard(dashboardId));
    navigate('/dashboard');
  };

  const handleDeleteDashboard = (dashboardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteDashboard(dashboardId));
    toast.success('Dashboard deleted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Dashboard & Widget Manager
          </h1>
          <p className="text-xl text-muted-foreground">
            Create powerful data visualizations and build custom dashboards
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-primary" onClick={() => navigate('/widgets')}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <BoxSelect className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Create Widget</h2>
              <p className="text-muted-foreground">
                Design and configure chart widgets with various visualization types
              </p>
              <Button className="w-full mt-4" size="lg">
                Manage Widgets
              </Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-primary" onClick={handleCreateDashboard}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <LayoutDashboard className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Create Dashboard</h2>
              <p className="text-muted-foreground">
                Build interactive dashboards by arranging and resizing widgets
              </p>
              <Button className="w-full mt-4" size="lg">
                Build Dashboard
              </Button>
            </div>
          </Card>
        </div>

        {dashboards.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Saved Dashboards</h2>
            <div className="grid gap-4">
              {dashboards.map((dashboard) => (
                <Card 
                  key={dashboard.id} 
                  className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                  onClick={() => handleLoadDashboard(dashboard.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{dashboard.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {dashboard.widgets.length} widget{dashboard.widgets.length !== 1 ? 's' : ''} • 
                        Created {new Date(dashboard.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="hover:bg-destructive hover:text-destructive-foreground">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Dashboard</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{dashboard.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={(e) => handleDeleteDashboard(dashboard.id, e)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
