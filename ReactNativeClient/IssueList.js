import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <>
        {/****** Q1: Start Coding here. ******/}
          <Text>This is a placeholder for the issue filter.</Text>
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 26,  // Increased font size for title
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#537791',
    paddingVertical: 10,  // More padding for height
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 14,  // Increased font size for headers
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,  // Increased padding for better readability
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,  // Larger font size for rows
    color: '#333333',
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,  // Larger font for input fields
  },
  buttonContainer: {
    marginVertical: 5,
  },
});

const width= [40,80,80,80,80,80,200];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    const rowData = [
      issue.id,
      issue.status,
      issue.owner,
      issue.created.toDateString(),
      issue.effort,
      issue.due ? issue.due.toDateString() : '',
      issue.title,
    ];
    {/****** Q2: Coding Ends here.******/}
    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <View style={styles.row}>
      {/* Render each data cell in the row */}
      {rowData.map((data, index) => (
        <Text key={index} style={styles.cell}>{data}</Text>
      ))}
      </View>
      {/****** Q2: Coding Ends here. ******/}  
      </>
    );
  }
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const tableHeaders = ["ID", "Status", "Owner", "Created", "Effort", "Due Date", "Title"];
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
    <View style={styles.container}>
    {/****** Q2: Start Coding here to render the table header/rows.**********/}
     {/* Table Header */}
     <View style={styles.headerRow}>
        {tableHeaders.map((header, index) => (
          <Text key={index} style={styles.headerCell}>{header}</Text>
        ))}
      </View>

      {/* Table Body (Rows) */}
      <View>
        {issueRows}
      </View>
    {/****** Q2: Coding Ends here. ******/}
    </View>
    );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = {owner: '', title: ''};
      /****** Q3: Code Ends here. ******/
    }
  
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setOwner(newOwner) {
      this.setState({owner: newOwner});
    }

    setTitle(newTitle) {
      this.setState({title: newTitle});
    }
    /****** Q3: Code Ends here. ******/
    
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const { owner, title } = this.state;
      const issue = {
        owner,
        title,
        due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10), // 10 days from now
      };

      // Call the createIssue function passed as a prop
      this.props.createIssue(issue);

      // Clear input fields
      this.setState({ owner: '', title: '' });
      this.ownerInput.clear();
      this.titleInput.clear();
      /****** Q3: Code Ends here. ******/
    }
  
    render() {
      return (
          <View>
          {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          {/* Owner Input */}
          <TextInput ref = {input => {this.ownerInput = input;}} style={styles.input} placeholder="Owner" onChangeText={(text) => this.setOwner(text)} />
          {/* Title Input */}
          <TextInput ref = {input => {this.titleInput = input;}} style={styles.input} placeholder="Title" onChangeText={(text) => this.setTitle(text)} />
          {/* Submit Button */}
          <Button title="Add" onPress={this.handleSubmit} style = {styles.buttonContainer}/>
          {/****** Q3: Code Ends here. ******/}
          </View>
      );
    }
  }

class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = {name: ''};
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setName(newName) {
      this.setState({name: newName});
    }
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    const query = `mutation blackListAdd($newName: String!) {
        addToBlacklist(nameInput: $newName)
    }`;
    const newName = this.state.name;
    console.log(newName);
    const data = await graphQLFetch(query, {newName});
    this.newNameInput.clear();
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput ref = {input => {this.newNameInput = input;}} style={styles.input} placeholder="Name To BlackList" onChangeText={(text) => this.setName(text)} />
        <Button onPress={this.handleSubmit} title="Add to BlackList" />
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }
    
    
    render() {
    return (
    <>
    {/****** Q1: Start Coding here. ******/}
    <IssueFilter />
    {/****** Q1: Code ends here ******/}

    {/****** Q2: Start Coding here. ******/}
    <IssueTable issues={this.state.issues} />
    {/****** Q2: Code ends here ******/}

    {/****** Q3: Start Coding here. ******/}
    <IssueAdd createIssue={this.createIssue} />
    {/****** Q3: Code Ends here. ******/}

    {/****** Q4: Start Coding here. ******/}
    <BlackList />
    {/****** Q4: Code Ends here. ******/}
    </>
    );
  }
}