import Loadable from "react-loadable";

export default [
  {
    path: "/login",
    exact: true,
    public: true,
    component: Loadable({
      loader: () => import("@containers/dashboard/signin"),
      loading: () => <></>,
    }),
  },
  {
    path: "/dashboard/site",
    public: false,
    component: Loadable({
      loader: () => import("@containers/dashboard/GeneratePage"),
      loading: () => <></>,
    }),
  },
  {
    path: "/dashboard/type",
    public: false,
    component: Loadable({
      loader: () => import("@containers/dashboard/GeneratePage"),
      loading: () => <></>,
    }),
  },
  {
    path: "/dashboard/type/categories",
    public: false,
    component: Loadable({
      loader: () => import("@containers/dashboard/GeneratePage"),
      loading: () => <></>,
    }),
  },
  {
    path: "/dashboard/type/articles",
    public: false,
    component: Loadable({
      loader: () => import("@containers/dashboard/GeneratePage"),
      loading: () => <></>,
    }),
  },
  {
    path: "/dashboard/type/surveys",
    public: false,
    component: Loadable({
      loader: () => import("@containers/dashboard/GeneratePage"),
      loading: () => <></>,
    }),
  },
  {
    path: "/dashboard/type/questions",
    public: false,
    component: Loadable({
      loader: () => import("@containers/dashboard/GeneratePage"),
      loading: () => <></>,
    }),
  }
];
