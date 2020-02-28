import { Card } from "react-bootstrap";

const DashboardTimeline = () => {
  return (
    <div>
      <div className='row'>
        <div className='mx-auto col-lg-6 col-sm-12'>
          <h6>Priority Level</h6>
          <span className='dot-hp'></span>
          <span className='mr-2'> High Priority</span>
          <span className='dot-mp'></span>
          <span className='mr-2'> Medium Priority</span>
          <span className='dot-lp'></span>
          <span className='mr-2'> Low Priority</span>
          <div className='mx-auto row'>
            <div mx-auto col-lg-6 col-sm-12>
              <span className='dot-undetermined'></span>
              <span className='mr-2'>Unspecified Priority</span>
            </div>
          </div>
        </div>
        <div className='mx-auto col-lg-6 col-sm-12'>
          <h6>Task Status</h6>
          <span className='dot-c'></span>
          <span className='mr-2'> Completed</span>
          <span className='dot-p'></span>
          <span className='mr-2'> In Progress</span>
          <span className='dot-s'></span>
          <span className='mr-2'> Stuck</span>
          <div mx-auto col-lg-6 col-sm-12>
            <span className='dot-unclaimed'></span>
            <span className='mr-2'> Unclaimed</span>
          </div>
        </div>
      </div>

      <div className='mx-auto row pb-5'>
        <div className='team-containter p-4'>
          <div className='row'>
            <div class='col-lg-12 mb-2'>
              <h1 class='team-header'>Urgent</h1>
            </div>
            <hr></hr>
            <div class='col-lg-12 mb-2'>
              <div class='row'>
                <div className='hp-border mr-2 mb-2'>
                  <div className='complete'>
                    <div className='task-card card'>
                      <div className='card-body d-flex flex-column over'>
                        <h5 className='task-name card-title mt-3'>
                          Deploy Application
                        </h5>
                        <div className='card-subtitle mb-1 text-muted'>
                          Heroku
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          Complete
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          High Priority
                        </div>
                        <div className='card-subtitle mb-1 alert-text'>
                          DUE TODAY
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          02/29/20
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='lp-border  mr-2 mb-2'>
                  <div className='stuck'>
                    <div className='task-card card'>
                      <div className='card-body d-flex flex-column over'>
                        <h5 className='task-name card-title mt-3'>
                          Buy Windex
                        </h5>
                        <div className='card-subtitle mb-1 text-muted'>
                          clean windows
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          stuck
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          Low Priority
                        </div>
                        <div className='card-subtitle mb-1 alert-text'>
                          DUE TODAY
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          02/29/20
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className='hp-border  mr-2 mb-2'>
                  <div className='in-progress'>
                    <div className='task-card card'>
                      <div className='card-body d-flex flex-column over'>
                        <h5 className='task-name card-title mt-3'>
                          Cook Dinner
                        </h5>
                        <div className='card-subtitle mb-1 text-muted'>
                          Make delicious meal
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          Working On
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          High Priority
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          03/10/20
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className='mp-border  mr-2 mb-2'>
                  <div className='complete'>
                    <div className='task-card card'>
                      <div className='card-body d-flex flex-column over'>
                        <h5 className='task-name card-title mt-3'>
                          Pay Gas Bill
                        </h5>
                        <div className='card-subtitle mb-1 text-muted'>
                          Spire
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          Working On
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          Medium Priority
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          03/28/20
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className='mp-border  mr-2 mb-2'>
                  <div className='in-progress'>
                    <div className='task-card card'>
                      <div className='card-body d-flex flex-column over'>
                        <h5 className='task-name card-title mt-3'>
                          Make Final Edits
                        </h5>
                        <div className='card-subtitle mb-1 text-muted'>
                          Task Description
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          Status
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          Priority Level
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          02/29/20
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className='lp-border  mr-2 mb-2'>
                  <div className='in-progress'>
                    <div className='task-card card'>
                      <div className='card-body d-flex flex-column over'>
                        <h5 className='task-name card-title mt-3'>
                          Attend Award Ceremony
                        </h5>
                        <div className='card-subtitle mb-1 text-muted'>
                          Task Description
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          Status
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          Priority Level
                        </div>
                        <div className='card-subtitle mb-1 text-muted'>
                          02/29/20
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='col-lg-12 mb-2 '>
                  <h1 class='team-header'>Soon Approaching</h1>
                </div>
                <hr></hr>
                <div class='col-lg-12 mb-2'>
                  <div class='row'>
                    {" "}
                    <div className='lp-border mr-2 mb-2'>
                      <div className='complete'>
                        <div className='task-card card'>
                          <div className='card-body d-flex flex-column over'>
                            <h5 className='task-name card-title mt-3'>
                              Repot Plants
                            </h5>
                            <div className='card-subtitle mb-1 text-muted'>
                              Task Description
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Status
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Priority Level
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              02/29/20
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    <div className='hp-border mr-2 mb-2'>
                      <div className='stuck'>
                        <div className='task-card card'>
                          <div className='card-body d-flex flex-column over'>
                            <h5 className='task-name card-title mt-3'>
                              Company Potluck
                            </h5>
                            <div className='card-subtitle mb-1 text-muted'>
                              Task Description
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Status
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Priority Level
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              02/29/20
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    <div className='hp-border mr-2 mb-2'>
                      <div className='in-progress'>
                        <div className='task-card card'>
                          <div className='card-body d-flex flex-column over'>
                            <h5 className='task-name card-title mt-3'>
                              Renew License
                            </h5>
                            <div className='card-subtitle mb-1 text-muted'>
                              Task Description
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Status
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Priority Level
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              02/29/20
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='lp-border mr-2 mb-2'>
                      <div className='stuck'>
                        <div className='task-card card'>
                          <div className='card-body d-flex flex-column over'>
                            <h5 className='task-name card-title mt-3'>
                              Location Rental Deposit
                            </h5>
                            <div className='card-subtitle mb-1 text-muted'>
                              Task Description
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Status
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Priority Level
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              02/29/20
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='col-lg-12 mb-2 '>
                  <h1 class='team-header'>On the Agenda</h1>
                </div>
                <hr></hr>
                <div class='col-lg-12 mb-2'>
                  <div class='row'>
                    <div className='mp-border mr-2 mb-2'>
                      <div className='stuck'>
                        <div className='task-card card'>
                          <div className='card-body d-flex flex-column over'>
                            <h5 className='task-name card-title mt-3'>
                              Quarterly Budget Due
                            </h5>
                            <div className='card-subtitle mb-1 text-muted'>
                              Task Description
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Status
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Priority Level
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              02/29/20
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='lp-border mr-2 mb-2'>
                      <div className='complete'>
                        <div className='task-card card'>
                          <div className='card-body d-flex flex-column over'>
                            <h5 className='task-name card-title mt-3'>
                              Meeting with CTO
                            </h5>
                            <div className='card-subtitle mb-1 text-muted'>
                              Task Description
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Status
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              Priority Level
                            </div>
                            <div className='card-subtitle mb-1 text-muted'>
                              02/29/20
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTimeline;
