class Gridimo {

    constructor() {

        this.columns = [];
        this.rows = [];

        this.tableRef = document.getElementsByClassName(Constants.gridimoTable).item(0);
        this.captionRef = document.getElementsByClassName(Constants.gridimoCaption).item(0);

        this.headerRef = document.getElementsByClassName(Constants.gridimoHeader).item(0);
        this.headerRowRef = document.getElementsByClassName(Constants.gridimoHeaderRow).item(0);
        this.headerCellRef = document.getElementsByClassName(Constants.gridimoHeaderCell).item(0);

        this.bodyRef = document.getElementsByClassName(Constants.gridimoBody).item(0);
        this.rowRef = document.getElementsByClassName(Constants.gridimoRow).item(0);
        this.cellRef = document.getElementsByClassName(Constants.gridimoCell).item(0);

        this.footerRef = document.getElementsByClassName(Constants.gridimoFooter).item(0);
        this.footerRowRef = document.getElementsByClassName(Constants.gridimoFooterRow).item(0);
        this.footerCellRef = document.getElementsByClassName(Constants.gridimoFooterCell).item(0);

    }

    setCaption(value) {
        this.captionRef.innerHTML = value;
    }

    addColumn(header) {

        var newId = this.columns.length > 0 ? Math.max(...this.columns.map(c => c.id)) + 1 : 1;
        var newColumnValue = "column" + "header" + newId.toString();

        //add the header
        var newColumnHTML = this.headerCellRef.cloneNode(true);
        var text = "<span class=\"" + "gridimoHeaderCellValue" + "\">" + header + "</span>";

        newColumnHTML.innerHTML = text + newColumnHTML.innerHTML;
        newColumnHTML.style.display = 'table-cell';
        newColumnHTML.classList.add(newColumnValue);

        this.headerRowRef.insertBefore(newColumnHTML, this.headerRowRef.querySelector('.gridimoHeaderDeleteRow'));
        this.headerRowRef.style.display = 'table-row';
        //add the footer
        // var newFooter = this.footerCellRef.cloneNode(true);
        // newFooter.innerHTML = null;
        // newFooter.style.display = 'table-cell';
        // this.footerRowRef.appendChild(newFooter);

        var column = {
            id: newId,
            value: newColumnValue,
            text: text,
            columnHTML: newColumnHTML
        }
        column.className = 'column' + column.id.toString();
        this.columns.push(column);

        this.rows.forEach(r => {

            var newCellInput = "<input class=\"gridimoCellInputValue\" type=\"text\" value=\"" + "Default" + "\" onkeyup=\"gridimo.editColumn(event)\"></input>";
            var newCell = r.rowHTML.querySelector('.gridimoCell').cloneNode(true);
            newCell.innerHTML = newCellInput;

            var cellToAdd = { column: column, cell: newCell };

            r.data.push(cellToAdd);
            r.rowHTML.insertBefore(newCell, r.rowHTML.querySelector('.gridimoDeleteRowCell'));

        });

        this.footerCellRef.style.display = 'table-cell';

    }

    deleteColumn(deleteButton) {

        var cell = deleteButton.parentElement;

        var columnToDelete = this.columns.filter(c => cell.classList.contains(c.value))[0];
        this.columns = this.columns.filter(c => cell.classList.contains(c.value) === false);
        cell.remove();

        this.rows.forEach(r => {

            var cellToDelete = r.data.filter(i => i.column.id === columnToDelete.id)[0];
            cellToDelete.cell.remove();

            r.data = r.data.filter(i => i.column.id !== columnToDelete.id);

        });

        if (this.columns.length === 0) {

            this.rows.forEach(r => {
                r.deleteColumn.remove();
            });
            this.rows = [];

            this.footerCellRef.style.display = 'none';
            this.headerRowRef.style.display = 'none';

        }

    }

    startEditingColumn(editButton) {

        var cell = editButton.parentElement;

        var text = cell.querySelector('.gridimoHeaderCellValue');
        text.style.display = 'none';

        var input = cell.getElementsByClassName("gridimoEditTextHeader")[0];
        input.style.display = 'block';
        input.focus();

    }

    editColumn(event) {

        if (event.keyCode === 13) {

            event.preventDefault();

            var cell = event.srcElement.parentElement;

            var text = cell.querySelector('.gridimoHeaderCellValue');
            text.innerHTML = event.srcElement.value;
            text.style.display = 'initial';

            var input = event.srcElement;
            input.style.display = 'none';

        }

    }

    addRow() {

        var newRow = this.rowRef.cloneNode(true);
        newRow.style.display = 'table-row';
        this.bodyRef.appendChild(newRow);

        var cell = newRow.querySelector('.gridimoCell');
        var row = {
            id: this.rows.length > 0 ? Math.max(...this.rows.map(c => c.id)) + 1 : 1,
            data: [],
            deleteColumn: newRow.querySelector('.gridimoDeleteRowCell'),
            rowHTML: newRow
        };
        row.className = 'row' + row.id.toString();
        newRow.classList.add(row.className);

        var newCellInput = "<input class=\"gridimoCellInputValue\" type=\"text\" value=\"" + "Default" + "\" onkeyup=\"gridimo.editColumn(event)\"></input>";

        this.columns.forEach(c => {

            if (cell == null) {

                var newCell = newRow.querySelector('.gridimoCell').cloneNode(true);
                newCell.innerHTML = newCellInput;

                row.data.push({ column: c, cell: newCell });
                newRow.insertBefore(newCell, row.deleteColumn);

            }
            else {

                cell.innerHTML = newCellInput;
                row.data.push({ column: c, cell: cell });
                cell = null;

            }

        });

        this.rows.push(row);

    }

    deleteRow(deleteButton) {

        var row = deleteButton.closest('.gridimoRow');
        this.rows = this.rows.filter(r => r.rowHTML.classList.contains(r.className));

        row.remove();

    }

}