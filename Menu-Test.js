var ss = SpreadsheetApp.getActiveSpreadsheet();
var Sheet = ss.getSheetByName("Menu");

function numberTab() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Sheet = ss.getSheetByName("Menu");
  var numbers = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]];
  Sheet.getRange('C2:L4').setValues(numbers);

}

function statement() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Sheet = ss.getSheetByName("Menu");
  var statements = 'Anthony & James are awesome!'
  Sheet.getRange('A1').setValue(statements)

}

function clearEntries() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var Sheet = ss.getSheetByName("Menu");
  Sheet.getRange('A1:L11').clear();
}

function AddMenu() {
  var menu = SpreadsheetApp.getUi().createMenu("Cool Thing")
  menu.addItem('Count to 10', 'numberTab');
  menu.addItem('Paste Statement', 'statement')
  menu.addSeparator();
  menu.addItem('Delete All', 'clearEntries')
  menu.addToUi();
}

function onOpen(e) {

AddMenu();
}