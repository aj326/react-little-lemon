import { useState } from "react"
import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";
import validator from "validator";
export default function Body() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false)
  const [usernameValid, setNameValid] = useState(false)
  const [username, setName] = useState("");

  //not very functional, can be improved
  function validateAndSetEmail(string) {
    let isValid = validator.isEmail(string)
    if (isValid) {
      setEmail(string)
    }
    setEmailValid(isValid)
    console.log(isValid, email)
  }
  function validateAndSetUser(string) {
    let isValid = validator.isAlpha(string)
    if (isValid) {
      setName(string)
    }
    setNameValid(isValid)


    console.log(isValid, username)
  }
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.header}>
          Let us get to know you
        </Text>
        <TextInput placeholder="First Name" style={styles.textInput} onChangeText={value => validateAndSetUser(value.trim())} />

        <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" onChangeText={value => validateAndSetEmail(value.trim())} />
      </View>
      <View style={styles.btnArea}>
        {!usernameValid && username != "" && <Text style={styles.textError}>Username is invalid</Text>}
        {!emailValid && email != "" && <Text style={styles.textError}>Email is invalid</Text>}

        {usernameValid && emailValid &&
          <Pressable style={styles.button} onPress={()=>null}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>


        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 0.8,
    justifyContent: 'space-around',
    backgroundColor: "#cbd2d9",
    marginTop: 10

  },
  footerContainer: {
    flex: 0.2,
    backgroundColor: 'green'

  },
  header: {
    fontSize: 30,
    marginBottom: 48,
    color:'#314551'
  },
  textInput: {
    height: 40,
    borderBottomWidth: 1,
    borderColor:'#314551',
    marginBottom: 36,
  },
  btnArea: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingEnd: 50,
    alignItems: "flex-end",
    backgroundColor: '#f1f4f7'
  },
  textError: {
    color: "#ec644b",
    fontWeight: "bold"
  },
  button: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: '#cbd2d9',
    backgroundColor: '#cbd2d9',
    borderRadius: 10,
  },
  buttonText: {
    color: '#667884'
  }

}
);