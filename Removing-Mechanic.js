var ui = SpreadsheetApp.getUi();
var Master = SpreadsheetApp.getActiveSpreadsheet(); // Grabs entire sheet
var RemovingMemberSheet = Master.getSheetByName('Adding/Removing'); // Grabs tab
var ListOfUsersSheet = Master.getSheetByName('User Info');
var MasterRoster = Master.getSheetByName('Main Roster');
var Logging = Master.getSheetByName('Script Logging');

function RemovingMember() {
  var MemberUID = AddingMemberSheet.getRange("C11").getValue(); // Getting Cell

  var UserInfoRow = FindUID(MemberUID); // Finds what row what user with that UID is on

  RemoveLog();

  ListOfUsersSheet.deleteRow(UserInfoRow);

  var UserRow = FindUIDMaster(MemberUID);


  MasterRoster.getRange(`C${UserRow}`).setValue("");


  ClearRemovalEntries();
}

function FindUID(UID) {
  var rowVal = ListOfUsersSheet.getRange('C:C').getValues();

  for (var i = 0; i < ListOfUsersSheet.getMaxRows(); i++) {
    if (rowVal[i][0] == UID) {
      return i + 1;
    }

  }
}

function FindFirstAvailableRowLog() {
   var RowVal = Logging.getRange('A2:A').getValues();

  for (var i = 0; i < Logging.getMaxRows(); i++) {
    if (RowVal[i][0] == '') {
      return i + 2;
    }
  }
}

function RemoveLog() {
  var NewMemberName = RemovingMemberSheet.getRange("D11").getValue(); // member's OOC Name
  var CoCMemberName = RemovingMemberSheet.getRange("B11").getValue(); // COC Name
  var NewMemberDiscordID = RemovingMemberSheet.getRange("C11").getValue(); // NewMemberDiscordID
  var CurrentDate = new Date;
  var NextAvailableLogRow = FindFirstAvailableRowLog();
  var Reason = RemovingMemberSheet.getRange("F11").getValue();

  Logging.getRange('A'+NextAvailableLogRow).setValue(CurrentDate);
  Logging.getRange('B'+NextAvailableLogRow).setValue(CoCMemberName);
  Logging.getRange('C'+NextAvailableLogRow).setValue(NewMemberName +" was removed from the roster!")
  Logging.getRange('D'+NextAvailableLogRow).setValue(NewMemberDiscordID);
  Logging.getRange('E'+NextAvailableLogRow).setValue(Reason);
}

function FindUIDMaster(UID) {
  var rowVal = MasterRoster.getRange('C:C').getValues();

  for (var i = 0; i < MasterRoster.getMaxRows(); i++) {
    if (rowVal[i][0] == UID) {
      return i + 1;
    }

  }
}

function ClearRemovalEntries() {
  AddingMemberSheet.getRange("B11").setValue('');
  AddingMemberSheet.getRange("C11").setValue('');
  AddingMemberSheet.getRange("E11").setValue(false);
  AddingMemberSheet.getRange("F11").setValue('');
}