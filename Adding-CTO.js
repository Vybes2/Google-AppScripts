var ui = SpreadsheetApp.getUi();
var Master = SpreadsheetApp.getActiveSpreadsheet();
var AddingMemberSheet = Master.getSheetByName('Adding/Removing'); // Rename to Adding Member
var UserInfoSheet = Master.getSheetByName('CTO User Info');  // Rename to User Info
var CTOMasterRoster = Master.getSheetByName('CTO Master Roster');

function AddingMember() {
  var NewMemberPrimaryCert = AddingMemberSheet.getRange("D5").getValue(); // NewMemberPrimaryCert
  var NewMemberCIVUID = AddingMemberSheet.getRange("C5").getValue(); // NewMemberCIVUID
  var NewMemberDiscordID = AddingMemberSheet.getRange("E5").getValue(); // NewMemberDiscordID
  var currentDate = Utilities.formatDate(new Date(), 'EST', 'MM/dd/yyyy');

  var FirstEmptyRow = FindFirstAvailableRow();

  UserInfoSheet.getRange(`B${FirstEmptyRow}`).setValue(NewMemberCIVUID); // "ListOfUsersSheet = User Info"
  UserInfoSheet.getRange(`G${FirstEmptyRow}`).setValue(NewMemberPrimaryCert);
  UserInfoSheet.getRange(`U${FirstEmptyRow}`).setValue(NewMemberDiscordID);
  UserInfoSheet.getRange(`T${FirstEmptyRow}`).setValue(currentDate);

  var FirstEmptyRowMaster = FindFirstAvailRowMaster();
  console.log(FirstEmptyRowMaster);
  CTOMasterRoster.getRange(`C${FirstEmptyRowMaster}`).setValue(NewMemberCIVUID);

  ClearEntries();
}

function FindFirstAvailableRow() {
  var rowVal = UserInfoSheet.getRange('B10:B').getValues(); // "C3:C = B10:B"

  for (var i = 0; i < UserInfoSheet.getMaxRows(); i++) {
    if (rowVal[i][0] == '') {
      return i + 10;
    }

  }
}


function FindFirstAvailRowMaster() {
  var rowVal = CTOMasterRoster.getRange('C31:C61').getValues();

  for (var i = 0; i < CTOMasterRoster.getMaxRows(); i++) {
    if (rowVal[i][0] == '') {
      return i + 31;
    }
  }
}

function ClearEntries() {
  AddingMemberSheet.getRange("B5").setValue(''); // Cells that correlate inputs
  AddingMemberSheet.getRange("C5").setValue('');
  AddingMemberSheet.getRange("D5").setValue('');
  AddingMemberSheet.getRange("E5").setValue('');
  AddingMemberSheet.getRange("F5").setValue(false);
}