var ui = SpreadsheetApp.getUi();
var Master = SpreadsheetApp.getActiveSpreadsheet(); // Grabs entire sheet
var RemovingMemberSheet = Master.getSheetByName('Adding/Removing'); // Grabs tab
var ListOfUsersSheet = Master.getSheetByName('CTO User Info');
var CTOMasterRoster = Master.getSheetByName('CTO Master Roster');
var CTOExternalRoster = Master.getSheetByName('CTO External Roster');

function RemovingMember() {
  var MemberUID = AddingMemberSheet.getRange("C11").getValue(); // Getting Cell

  var UserInfoRow = FindUID(MemberUID); // Finds what row what user with that UID is on

  ListOfUsersSheet.deleteRow(UserInfoRow);

  var UserRow = FindUIDMaster(MemberUID);
  console.log(UserRow)
  if (UserRow == undefined) {
    UserRow = FindUIDExternal(MemberUID);
    CTOExternalRoster.getRange(`C${ UserRow }`).setValue("");
  } else {
    CTOMasterRoster.getRange(`C${ UserRow }`).setValue("");
  }

  ClearRemovalEntries();
}

function FindUID(UID) {
  var rowVal = ListOfUsersSheet.getRange('B:B').getValues();

  for (var i = 0; i < ListOfUsersSheet.getMaxRows(); i++) {
    if (rowVal[i][0] == UID) {
      return i + 1;
    }

  }
}

function FindUIDExternal(UID) {
  var rowVal = CTOExternalRoster.getRange('C:C').getValues();

  for (var i = 0; i < CTOExternalRoster.getMaxRows(); i++) {
    if (rowVal[i][0] == UID) {
      return i + 1;
    }

  }
}

function FindUIDMaster(UID) {
  var rowVal = CTOMasterRoster.getRange('C:C').getValues();

  for (var i = 0; i < CTOMasterRoster.getMaxRows(); i++) {
    if (rowVal[i][0] == UID) {
      return i + 1;
    }

  }
}

function ClearRemovalEntries() {
  AddingMemberSheet.getRange("B11").setValue('');
  AddingMemberSheet.getRange("C11").setValue('');
  AddingMemberSheet.getRange("D11").setValue(false);
}
