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
      <Check className="check-icon" aria-label="Included" />
    ) : (
      <X className="x-icon" aria-label="Not included" />
    );
  };

  return (
    <section id="checklist" className="checklist-section">
      <div className="section-badge">
        <span>{checklist.badge}</span>
      </div>

      <h2 className="checklist-title">{checklist.title}</h2>
      {checklist.subtitle && <p className="checklist-subtitle">{checklist.subtitle}</p>}

      <div className="checklist-container">
        <table className="checklist-table">
          <thead>
            <tr>
              <th className="task-column"></th>
              {checklist.columns.map((col) => (
                <th className="service-column" key={col}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checklist.categories.map((category) => (
              <React.Fragment key={category.name}>
                <tr className="category-row">
                  <td colSpan={checklist.columns.length + 1}>{category.name}</td>
                </tr>
                {category.tasks.map((task) => (
                  <tr className="task-row" key={task.task}>
                    <td className="task-name">{task.task}</td>
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