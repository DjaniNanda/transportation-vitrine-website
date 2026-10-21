import React from 'react';
import { Check, X, ListChecks } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import './Checklist.css';

const Checklist: React.FC = () => {
  const { checklist } = siteConfig;

  const renderCell = (value: boolean | string) => {
    if (typeof value === 'string') {
      return <span className="text-xs">{value}</span>;
    }
    return value ? (
      <Check className="checklist-icon checklist-check-icon" role="img" aria-label="Included" />
    ) : (
      <X className="checklist-icon checklist-x-icon" role="img" aria-label="Not included" />
    );
  };

  return (
    <section id="checklist" className="checklist-section" aria-labelledby="checklist-heading">
      <div className="section-badge">
        <ListChecks className="badge-icon" aria-hidden="true" />
        <span>{checklist.badge}</span>
      </div>

      <h2 id="checklist-heading" className="checklist-title">
        {checklist.title}
      </h2>
      {checklist.subtitle && <p className="checklist-subtitle">{checklist.subtitle}</p>}

      <div className="checklist-container">
        <table className="checklist-table" aria-labelledby="checklist-heading">
          <thead>
            <tr>
              <td className="task-column" />
              {checklist.columns.map((col) => (
                <th scope="col" className="service-column" key={col}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checklist.categories.map((category) => (
              <React.Fragment key={category.name}>
                <tr className="category-row">
                  <th scope="colgroup" colSpan={checklist.columns.length + 1}>
                    {category.name}
                  </th>
                </tr>
                {category.tasks.map((task) => (
                  <tr className="task-row" key={task.task}>
                    <th scope="row" className="task-name">
                      {task.task}
                    </th>
                    {task.values.map((value, idx) => (
                      <td key={idx}>{renderCell(value)}</td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Checklist;