
import axios from "axios";


const createDagPayload = {
    'dag_id': 'amitpagespeed',
    'schedule': '0 0 * * *',
    'start_date': '2024-08-03'
}
//   schedule_options = {
//     'Daily at midnight (IST)': '0 0 * * *',
//     'Daily at 6 AM (IST)': '0 6 * * *',
//     'Daily at 12 PM (IST)': '0 12 * * *',
//     'Weekly on Mondays at midnight (IST)': '0 0 * * 1',
//     'Hourly': '0 * * * *'
// }

export const createDag = async (data) => {
    try {
      const response = await axios.post('https://4570-202-78-234-201.ngrok-free.app/create_dag', data);

    //   response = {
    //     "message": "DAG file created and Airflow reloaded",
    //     "dag_file_path": "C:/Users/Saptarshi/Documents/kie_tools/docker/dags\\amitpagespeedinsights.py",
    //     "refresh_output": {
    //         "error": " Container docker-redis-1  Running\n Container docker-postgres-1  Running\n Container docker-airflow-init-1  Created\n Container docker-redis-1  Waiting\n Container docker-postgres-1  Waiting\n Container docker-redis-1  Healthy\n Container docker-postgres-1  Healthy\n Container docker-airflow-init-1  Starting\n Container docker-airflow-init-1  Started\n/home/airflow/.local/lib/python3.7/site-packages/airflow/models/dagbag.py:638 RemovedInAirflow3Warning: DAG.full_filepath is deprecated in favour of fileloc\nTraceback (most recent call last):\n  File \"/home/airflow/.local/bin/airflow\", line 8, in <module>\n    sys.exit(main())\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/__main__.py\", line 39, in main\n    args.func(args)\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/cli/cli_parser.py\", line 52, in command\n    return func(*args, **kwargs)\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/utils/session.py\", line 75, in wrapper\n    return func(*args, session=session, **kwargs)\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/utils/cli.py\", line 103, in wrapper\n    return f(*args, **kwargs)\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/cli/commands/dag_command.py\", line 507, in dag_reserialize\n    dagbag.sync_to_db(session=session)\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/utils/session.py\", line 72, in wrapper\n    return func(*args, **kwargs)\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/models/dagbag.py\", line 644, in sync_to_db\n    for attempt in run_with_db_retries(logger=self.log):\n  File \"/home/airflow/.local/lib/python3.7/site-packages/tenacity/__init__.py\", line 384, in __iter__\n    do = self.iter(retry_state=retry_state)\n  File \"/home/airflow/.local/lib/python3.7/site-packages/tenacity/__init__.py\", line 351, in iter\n    return fut.result()\n  File \"/usr/local/lib/python3.7/concurrent/futures/_base.py\", line 428, in result\n    return self.__get_result()\n  File \"/usr/local/lib/python3.7/concurrent/futures/_base.py\", line 384, in __get_result\n    raise self._exception\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/models/dagbag.py\", line 659, in sync_to_db\n    self.dags.values(), processor_subdir=processor_subdir, session=session\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/utils/session.py\", line 72, in wrapper\n    return func(*args, **kwargs)\n  File \"/home/airflow/.local/lib/python3.7/site-packages/airflow/models/dag.py\", line 2596, in bulk_write_to_db\n    orm_dags: list[DagModel] = with_row_locks(query, of=DagModel, session=session).all()\n  File \"/home/airflow/.local/lib/python3.7/site-packages/sqlalchemy/orm/query.py\", line 2759, in all\n    return self._iter().all()\n  File \"/home/airflow/.local/lib/python3.7/site-packages/sqlalchemy/orm/query.py\", line 2897, in _iter\n    execution_options={\"_sa_orm_load_options\": self.load_options},\n  File \"/home/airflow/.local/lib/python3.7/site-packages/sqlalchemy/orm/session.py\", line 1688, in execute\n    conn = self._connection_for_bind(bind)\n  File \"/home/airflow/.local/lib/python3.7/site-packages/sqlalchemy/orm/session.py\", line 1530, in _connection_for_bind\n    engine, execution_options\n  File \"/home/airflow/.local/lib/python3.7/site-packages/sqlalchemy/orm/session.py\", line 721, in _connection_for_bind\n    self._assert_active()\n  File \"/home/airflow/.local/lib/python3.7/site-packages/sqlalchemy/orm/session.py\", line 608, in _assert_active\n    code=\"7s2a\",\nsqlalchemy.exc.PendingRollbackError: This Session's transaction has been rolled back due to a previous exception during flush. To begin a new transaction with this Session, first issue Session.rollback(). Original exception was: (psycopg2.errors.UniqueViolation) duplicate key value violates unique constraint \"serialized_dag_pkey\"\nDETAIL:  Key (dag_id)=(latest) already exists.\n\n[SQL: INSERT INTO serialized_dag (dag_id, fileloc, fileloc_hash, data, data_compressed, last_updated, dag_hash, processor_subdir) VALUES (%(dag_id)s, %(fileloc)s, %(fileloc_hash)s, %(data)s, %(data_compressed)s, %(last_updated)s, %(dag_hash)s, %(processor_subdir)s)]\n[parameters: ({'dag_id': 'amitpagespeed', 'fileloc': '/opt/airflow/dags/amitpagespeed.py', 'fileloc_hash': 67102197019621546, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (1289 characters truncated) ... onOperator\", \"_task_module\": \"airflow.operators.python\", \"_is_empty\": false, \"op_args\": [], \"op_kwargs\": {}}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 42, 378402, tzinfo=Timezone('UTC')), 'dag_hash': 'f3d06cec292b9b9ce60a634c9d47f777', 'processor_subdir': None}, {'dag_id': 'amit_demo', 'fileloc': '/opt/airflow/dags/amit_demo.py', 'fileloc_hash': 50531352891828479, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (1290 characters truncated) ... onOperator\", \"_task_module\": \"airflow.operators.python\", \"_is_empty\": false, \"op_args\": [], \"op_kwargs\": {}}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 42, 520175, tzinfo=Timezone('UTC')), 'dag_hash': '0d6500546126d5a8fd714f4165198211', 'processor_subdir': None}, {'dag_id': 'ddd', 'fileloc': '/opt/airflow/dags/ddd.py', 'fileloc_hash': 39869999684209430, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (1271 characters truncated) ... onOperator\", \"_task_module\": \"airflow.operators.python\", \"_is_empty\": false, \"op_args\": [], \"op_kwargs\": {}}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 42, 562759, tzinfo=Timezone('UTC')), 'dag_hash': 'c3316049a4959bdfaf6490643b3c37e1', 'processor_subdir': None}, {'dag_id': 'finaltry', 'fileloc': '/opt/airflow/dags/finaltry.py', 'fileloc_hash': 34395272760782808, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (1281 characters truncated) ... onOperator\", \"_task_module\": \"airflow.operators.python\", \"_is_empty\": false, \"op_args\": [], \"op_kwargs\": {}}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 42, 596315, tzinfo=Timezone('UTC')), 'dag_hash': '7b54907ca68c1bf1506a5587fa1bd24c', 'processor_subdir': None}, {'dag_id': 'kkrr', 'fileloc': '/opt/airflow/dags/kkrr.py', 'fileloc_hash': 48921283078716336, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (1273 characters truncated) ... onOperator\", \"_task_module\": \"airflow.operators.python\", \"_is_empty\": false, \"op_args\": [], \"op_kwargs\": {}}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 42, 639212, tzinfo=Timezone('UTC')), 'dag_hash': '4a84fcba65c963903ab2fa360bc6277e', 'processor_subdir': None}, {'dag_id': 'latest', 'fileloc': '/opt/airflow/dags/latest.py', 'fileloc_hash': 38770076200412157, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (1283 characters truncated) ... onOperator\", \"_task_module\": \"airflow.operators.python\", \"_is_empty\": false, \"op_args\": [], \"op_kwargs\": {}}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 42, 669257, tzinfo=Timezone('UTC')), 'dag_hash': 'ae01ce5b4a505d8f34f21a12aada273f', 'processor_subdir': None}, {'dag_id': 'mynewdag', 'fileloc': '/opt/airflow/dags/mynewdag.py', 'fileloc_hash': 33248347725880866, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (1279 characters truncated) ... onOperator\", \"_task_module\": \"airflow.operators.python\", \"_is_empty\": false, \"op_args\": [], \"op_kwargs\": {}}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 42, 691822, tzinfo=Timezone('UTC')), 'dag_hash': '04883429fe030c8c3c20f05ba530d5d2', 'processor_subdir': None}, {'dag_id': 'new_testing', 'fileloc': '/opt/airflow/dags/new_testing.py', 'fileloc_hash': 8123329356969022, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (1293 characters truncated) ... onOperator\", \"_task_module\": \"airflow.operators.python\", \"_is_empty\": false, \"op_args\": [], \"op_kwargs\": {}}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 42, 718966, tzinfo=Timezone('UTC')), 'dag_hash': '64246fe0db72ec8aed1a6ebdff7da9ff', 'processor_subdir': None}  ... displaying 10 of 64 total bound parameter sets ...  {'dag_id': 'example_task_group', 'fileloc': '/home/airflow/.local/lib/python3.7/site-packages/airflow/example_dags/example_task_group.py', 'fileloc_hash': 24583442273043212, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (5109 characters truncated) ... renderers\": {}, \"_task_type\": \"EmptyOperator\", \"_task_module\": \"airflow.operators.empty\", \"_is_empty\": true}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 45, 424113, tzinfo=Timezone('UTC')), 'dag_hash': '92431b4243394b61f39ecf91fff49ef8', 'processor_subdir': None}, {'dag_id': 'tutorial_taskflow_api', 'fileloc': '/home/airflow/.local/lib/python3.7/site-packages/airflow/example_dags/tutorial_taskflow_api.py', 'fileloc_hash': 19385249608083423, 'data': '{\"__version\": 1, \"dag\": {\"_task_group\": {\"_group_id\": null, \"prefix_group_id\": true, \"tooltip\": \"\", \"ui_color\": \"CornflowerBlue\", \"ui_fgcolor\": \"#000 ... (3065 characters truncated) ... op_args\": \"(XComArg(<Task(_PythonDecoratedOperator): transform>, \\'total_order_value\\'),)\", \"op_kwargs\": {}}], \"dag_dependencies\": [], \"params\": {}}}', 'data_compressed': None, 'last_updated': datetime.datetime(2024, 8, 3, 8, 56, 45, 467503, tzinfo=Timezone('UTC')), 'dag_hash': '0e4d870a0641b15e059cb929ca1d75e2', 'processor_subdir': None})]\n(Background on this error at: https://sqlalche.me/e/14/gkpj) (Background on this error at: https://sqlalche.me/e/14/7s2a)\n"
    //     }
    // }
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };





  const unpauseDagPayload = {
    'dag_id': 'amitpagespeed',

  }

  export const unpauseDag = async (data) => {
    try {
      const response = await axios.post('https://4570-202-78-234-201.ngrok-free.app/unpause_dag', data);

    //   response = {
    //     "message": "DAG amitpagespeedinsights unpaused",
    //     "output": {
    //         "error": " Container docker-redis-1  Running\n Container docker-postgres-1  Running\n Container docker-airflow-init-1  Created\n Container docker-redis-1  Waiting\n Container docker-postgres-1  Waiting\n Container docker-postgres-1  Healthy\n Container docker-redis-1  Healthy\n Container docker-airflow-init-1  Starting\n Container docker-airflow-init-1  Started\nDAG: amitpagespeedinsights does not exist in 'dag' table\n"
    //     }
    // }
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };

  const pauseDagPayload = {
    'dag_id': 'amitpagespeed',

  }

  export const pauseDag = async (data) => {
    try {
      const response = await axios.post('https://4570-202-78-234-201.ngrok-free.app/pause_dag', data);
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };

  export const listAllDags = async (data) => {
    try {
      const response = await axios.post('https://4570-202-78-234-201.ngrok-free.app/list_dags', data);
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };

  const triggerDagPayload = 
    {'dag_id': 's3sjtabletest'}
  
  export const triggerDag = async (data) => {
    try {
      const response = await axios.post('https://4570-202-78-234-201.ngrok-free.app/trigger_dag', data);
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in getting user info:', error);
      throw error;
    }
  };


