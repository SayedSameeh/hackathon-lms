export interface PathModule {
  id: string;
  module_order: number;
  name: string;
  topic: string;
  duration: number;
  is_completed: boolean;
  session_notes?: string | null;
}

export interface UserPath {
  path: { id: string; target_skill: string; user_interest: string; created_at: string };
  modules: PathModule[];
}

export const pathProgress = (modules: PathModule[]) => {
  const done = modules.filter((m) => m.is_completed).length;
  return {
    done,
    total: modules.length,
    percent: modules.length ? Math.round((done / modules.length) * 100) : 0,
    next: modules.find((m) => !m.is_completed) ?? null,
  };
};

export const learningStats = (paths: UserPath[]) => {
  const all = paths.flatMap((p) => p.modules);
  const completed = all.filter((m) => m.is_completed);
  return {
    paths: paths.length,
    completed: completed.length,
    total: all.length,
    minutes: completed.reduce((sum, m) => sum + (m.duration || 0), 0),
    percent: all.length ? Math.round((completed.length / all.length) * 100) : 0,
  };
};
