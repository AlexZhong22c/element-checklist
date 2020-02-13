export const _genSubmitMethod = (validated, confirmed, formObj, method) => {
  if (confirmed && validated) {
    return `
    ${method}(formRefName) {
        this.$refs[formRefName].validate((valid) => {
          if (valid) {
            this.$confirm('此操作将永久删除此项, 是否继续?', '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(await () => {
                    await ${method}(this.${formObj})
                    this.$message.success('创建成功')
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
              });
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    }`.trim();
  }

  if (confirmed) {
    return `
    ${method}(formRefName) {
        this.$confirm('此操作将永久删除此项, 是否继续?', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(await () => {
              await ${method}(this.${formObj})
              this.$message.success('创建成功')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
        });
      }
    `.trim();
  }
  if (validated) {
    return `
${method}(formRefName) {
  this.$refs[formRefName].validate(valid => {
    if (valid) {
      this.$message.success('提交表单成功!');
      return;
    } else {
      this.$message.error('表单校验失败');
      this.scrollToInvalid();
      return;
    }
  });
}`.trim();
  }
  return `
    async ${method}() {
        this.$message.success('创建成功')
    }`.trim();
};
