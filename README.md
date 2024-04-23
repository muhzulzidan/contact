# Frontend Coding Test

- Create simple crud contact apps for Web, Android or iOS (choose 1 based on your
expertise) (Point 30).
- Using redux for state management would be nice. (Point 10).
- Use this API https://contact.herokuapp.com/contact, read the documentation here:
https://contact.herokuapp.com/documentation
- Because we will work with UI, please give us your best UI design. (Point 10)
- Send us back your apps result (Point 10)
o for android .apk file
o for iOS .app file
o for web deploy your app
- Using git repository (Point 10)
- Adding unit test is a must. (Point 10)

framework to use:
- Android: native / react-native
- iOS: native / react-native
- Web: react
please send us your coding result by 2 days after you get the email.
Good luck!!


// 20240423052639
// https://contact.herokuapp.com/contact

{
  "message": "Get contacts",
  "data": [
    {
      "id": "93ad6070-c92b-11e8-b02f-cbfa15db428b",
      "firstName": "Bilbo",
      "lastName": "Baggins",
      "age": 111,
      "photo": "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
    },
    {
      "id": "b3abd640-c92b-11e8-b02f-cbfa15db428b",
      "firstName": "Luke",
      "lastName": "Skywalker",
      "age": 20,
      "photo": "N/A"
    },
    {
      "firstName": "Bilboooo",
      "lastName": "Bagginsda",
      "age": 88,
      "photo": "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
      "id": "f3486bf0-0053-11ef-b49a-bb301028b3c7"
    }
  ]
}



Contact Service API Documentation
contactShow/HideList OperationsExpand Operations
GET /contactGet all contact
POST /contactSave contact
DELETE /contact/{id}Delete Contact
GET /contact/{id}Get Contact by id
PUT /contact/{id}Edit Contact


