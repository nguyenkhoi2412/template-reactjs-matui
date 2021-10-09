import { useTranslation } from "react-i18next";

export default {
  TASK_TODOS: () => {
    const { t } = useTranslation();

    return [
      {
        id: "1",
        todo: "todo",
        color: "primary",
        value: t("task.todo"),
        selected: true,
      },
      {
        id: "2",
        todo: "washing",
        color: "info",
        value: t("task.washing"),
        selected: false,
      },
      {
        id: "3",
        todo: "drying",
        color: "warning",
        value: t("task.drying"),
        selected: false,
      },
      {
        id: "4",
        todo: "success",
        color: "success",
        value: t("task.done"),
        selected: false,
      },
      {
        id: "5",
        todo: "delivery",
        color: "delivery",
        value: t("task.delivery"),
        selected: false,
      },
      {
        id: "6",
        todo: "delete",
        color: "delete",
        value: t("task.delete"),
        selected: false,
      },
    ];
  },
};
