class Gridimo {

    constructor() {

        this.columns = [];

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

        var newId = Math.max(this.columns.map(c => c.id)) + 1;
        var newColumnValue = "column" + "header" + newId.toString();

        //add the header
        var newColumn = this.headerCellRef.cloneNode(true);
        var text = "<span class=\"" + "gridimoHeaderCellValue" + "\">" + header + "</span>";
        newColumn.innerHTML = text + newColumn.innerHTML;
        newColumn.style.display = 'table-cell';
        newColumn.classList.add(newColumnValue);
        this.headerRowRef.appendChild(newColumn);

        //add the body
        // var newBody = this.cellRef.cloneNode(true);
        // newBody.innerHTML = null;
        // newBody.style.display = 'table-cell';
        // this.rowRef.appendChild(newBody);

        //add the footer
        // var newFooter = this.footerCellRef.cloneNode(true);
        // newFooter.innerHTML = null;
        // newFooter.style.display = 'table-cell';
        // this.footerRowRef.appendChild(newFooter);

        this.columns.push({
            id: newId,
            value: newColumnValue,
            text: text,
            column: newColumn
        });

    }

    deleteColumn(deleteButton) {

        var cell = deleteButton.parentElement;

        this.columns = this.columns.filter(c => cell.classList.contains(c.value) === false);
        cell.remove();

    }

    startEditingColumn(editButton) {

        var cell = editButton.parentElement;
        
        var text = cell.querySelector('.gridimoHeaderCellValue');
        text.style.display = 'none';

        var input = cell.getElementsByClassName("gridimoEditTextHeader")[0];
        input.style.display = 'block';

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

    insertRow() {

    }

}