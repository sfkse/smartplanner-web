export const createClassDialogueContent = {
  title: "Skapa ny klass",
  fields: [
    {
      label: "Klassnamn",
      name: "className",
      type: "text",
    },
  ],
};

export const createLessonDialogueContent = {
  title: "Skapa ny kurs",
  fields: [
    {
      label: "Kursnamn",
      name: "lessonName",
      type: "text",
    },
  ],
};

export const createTimePlanDialogueContent = {
  title: "Skapa ny timplan",
  fields: [
    {
      label: "Namn på timplan",
      name: "timePlan",
      type: "text",
    },
    {
      label: "Klass",
      name: "className",
      type: "select",
    },
  ],
};

