import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../LayoutAuthenticated';
import OptionsBar from '../OptionsBar';
import Gnome2Icon from '../../assets/svg/gnome2.svg';
import './style.css';

const DashboardPage = props =>
  <Layout className="dashboard-page">
    <OptionsBar>
      <p>{props.primaryHeading}</p>
    </OptionsBar>
    <div className="dashboard-page-content">
      <div className="dashboard-container">
        <div className="dashboard-row">
          <div className="dashboard-row-inner">
            <div className="dashboard-section">
              <div className="dashboard-section-header">
                <div className="dashboard-section-heading">
                  <Gnome2Icon />
                  <h1>This is my dashboard</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>;

DashboardPage.propTypes = {
  primaryHeading: PropTypes.string,
};

export default DashboardPage;
