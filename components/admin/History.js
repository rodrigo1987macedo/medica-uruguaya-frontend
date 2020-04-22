import React from "react";
import styled from "styled-components";
import { table } from "../../constants/table";
import { status } from "../../constants/status";

const HistoryWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 20px 0 0 0;
  padding: 22px 0 0 0;
  border-top: 1px solid ${props => props.theme.colors.border2};
  > div:nth-child(1) {
    flex: 0 0 200px;
  }
  > div:nth-child(n + 2) {
    flex: 1;
  }
`;
const HistoryHeading = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.colors.border1};
  padding: 8px;
  background: ${props => props.theme.colors.background1};
`;

const HistoryContent = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border1};
  padding: 14px 8px;
  color: ${props =>
    props.status === status.PENDING
      ? props.theme.colors.process
      : props.status === status.SUCCESS
      ? props.theme.colors.success
      : props.status === status.ERROR
      ? props.theme.colors.error
      : "inherit"};
`;

// export const table = {
// FILES: "Archivos",
// STATE: "Estado",
// MAIL: "Mail",
// NUMBER: "Número",
// DATE_MOD: "Edición",
// DATE_CRE: "Creación"
// };

function History({ data }) {
  return (
    <HistoryWrapper>
      {data.map(column => {
        return (
          <div key={column.heading}>
            <HistoryHeading>{column.heading}</HistoryHeading>
            {column.content && column.content.map((item, index) => {
              return (
                <HistoryContent
                  key={item.toString() + index}
                  status={column.heading === table.STATE && item}
                >
                  {column.heading === table.FILES ? item.name : item}
                </HistoryContent>
              );
            })}
          </div>
        );
      })}
    </HistoryWrapper>
  );
}

export default History;
