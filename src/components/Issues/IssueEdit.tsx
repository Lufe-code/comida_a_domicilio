import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIssue, updateIssue } from "../../api/Issue.api";
import IssueForm from "../../components/Issues/issuesForm";
import { IssueData } from "../../types/Issue.type";

const EditIssuePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState<Partial<IssueData>>();

  useEffect(() => {
    if (id) {
      getIssue(Number(id)).then(issue => {
        setDefaultValues(issue);
      });
    }
  }, [id]);

  return (
    <IssueForm
      defaultValues={defaultValues}
      onSubmit={async (data) => {
        if (id) {
          await updateIssue(Number(id), data);
          navigate("/issues");
        }
      }}
    />
  );
};

export default EditIssuePage;