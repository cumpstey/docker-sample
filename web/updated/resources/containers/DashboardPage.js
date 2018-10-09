import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DashboardPage from '../components/DashboardPage';

const getDashboardProps = state => {
  return {
    primaryHeading: 'My dashboard',
  };
};

const mapStateToProps = (state, ownProps) => {
  const dashboardProps = getDashboardProps(state);

  return {
    ...dashboardProps,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DashboardPage);
